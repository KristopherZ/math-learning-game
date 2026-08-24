'use client';

import { useEffect, useRef } from 'react';

type MathJaxApi = {
  output?: { font?: string };
  startup?: { promise?: Promise<unknown>; typeset?: boolean };
  tex?: { inlineMath?: string[][]; processEscapes?: boolean };
  typesetClear?: (elements?: HTMLElement[]) => void;
  typesetPromise?: (elements?: HTMLElement[]) => Promise<unknown>;
};

declare global {
  interface Window {
    MathJax?: MathJaxApi;
  }
}

let mathJaxLoader: Promise<void> | null = null;

function loadMathJax() {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.MathJax?.typesetPromise) return Promise.resolve();
  if (mathJaxLoader) return mathJaxLoader;

  mathJaxLoader = new Promise<void>((resolve, reject) => {
    window.MathJax = {
      output: { font: 'mathjax-newcm' },
      startup: { typeset: false },
      tex: {
        inlineMath: [['\\(', '\\)']],
        processEscapes: true,
      },
    };

    const existing = document.getElementById('project-proof-mathjax') as HTMLScriptElement | null;
    const script = existing ?? document.createElement('script');

    const finish = () => {
      Promise.resolve(window.MathJax?.startup?.promise)
        .then(() => resolve())
        .catch(reject);
    };

    if (window.MathJax?.typesetPromise) {
      finish();
      return;
    }

    script.addEventListener('load', finish, { once: true });
    script.addEventListener('error', () => reject(new Error('MathJax failed to load')), { once: true });
    if (!existing) {
      script.id = 'project-proof-mathjax';
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@4.1.3/tex-chtml.js';
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return mathJaxLoader;
}

export const conceptTex = {
  equality: '=',
  union: '\\cup',
  intersection: '\\cap',
  difference: '\\setminus',
  cartesian: '\\times',
} as const;

export function plainSetToTex(value: string) {
  return value
    .replaceAll('{', '\\{')
    .replaceAll('}', '\\}')
    .replaceAll('α', '\\alpha')
    .replaceAll('β', '\\beta');
}

export function MathTex({ tex, fallback, className }: {
  tex: string;
  fallback?: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let cancelled = false;

    loadMathJax()
      .then(async () => {
        if (cancelled || !rootRef.current) return;
        window.MathJax?.typesetClear?.([root]);
        root.textContent = `\\(${tex}\\)`;
        await window.MathJax?.typesetPromise?.([root]);
      })
      .catch(() => {
        if (!cancelled && rootRef.current) rootRef.current.textContent = fallback ?? tex;
      });

    return () => {
      cancelled = true;
      window.MathJax?.typesetClear?.([root]);
    };
  }, [fallback, tex]);

  return <span ref={rootRef} className={className}>{fallback ?? tex}</span>;
}
