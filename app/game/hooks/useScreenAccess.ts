import { useEffect, useState } from 'react';

export type ScreenAccess = 'checking' | 'blocked' | 'supported';

function hasPreferredRatio() {
  if (typeof window === 'undefined' || !window.innerWidth || !window.innerHeight) return true;
  const ratio = window.innerWidth / window.innerHeight;
  const hasPlayableHeight = window.innerHeight >= 600;
  return ratio >= 1.25 && (hasPlayableHeight || ratio <= 2.05);
}

export function useScreenAccess() {
  const [screenAccess, setScreenAccess] = useState<ScreenAccess>('checking');

  useEffect(() => {
    const update = () => setScreenAccess(hasPreferredRatio() ? 'supported' : 'blocked');
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return screenAccess;
}

export function requestMobileFullscreen() {
  if (!window.matchMedia('(pointer: coarse)').matches || document.fullscreenElement) return;
  const root = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
  };
  const request = root.requestFullscreen?.bind(root) || root.webkitRequestFullscreen?.bind(root);
  try {
    void Promise.resolve(request?.()).catch(() => undefined);
  } catch {
    // Fullscreen is optional; some mobile browsers reject it even after a gesture.
  }
}
