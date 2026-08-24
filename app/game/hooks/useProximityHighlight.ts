import { useEffect } from 'react';

const HIGHLIGHT_SELECTOR = [
  '.scene-number',
  '.scene-whisper',
  '.scene-message',
  '.door-need',
  '.set-case small',
  '.world-object > span:last-child',
  '.set-notation',
  '.world-symbol',
  '.phone-screen',
  '.document-status',
  '.spy-status',
  '.camera-status',
  '.copy-equation',
  '.copy-status',
  '.cipher-instruction',
  '.cipher-equation',
  '.prologue-copy',
  '.briefing-route',
  '.tiny-note p',
  '.tiny-note code',
  '.ending-scene > p',
  '.ending-scene > span',
].join(',');

export function useProximityHighlight(stage: number, noteOpen: boolean) {
  useEffect(() => {
    const textNodes = Array.from(document.querySelectorAll<HTMLElement>(HIGHLIGHT_SELECTOR));
    let frame = 0;
    let pointerX = -1000;
    let pointerY = -1000;

    const paint = () => {
      textNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const dx = Math.max(rect.left - pointerX, 0, pointerX - rect.right);
        const dy = Math.max(rect.top - pointerY, 0, pointerY - rect.bottom);
        const proximity = Math.max(0, 1 - Math.hypot(dx, dy) / 170);
        node.style.setProperty('--near', proximity.toFixed(3));
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };
    const reset = () => textNodes.forEach((node) => node.style.setProperty('--near', '0'));

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', reset);
    };
  }, [stage, noteOpen]);
}
