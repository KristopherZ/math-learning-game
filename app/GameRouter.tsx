'use client';

import { useEffect, useState } from 'react';
import ChapterZeroOne from './ChapterZeroOne';
import ChapterZeroTwo from './ChapterZeroTwo';

type Chapter = '0.1' | '0.2';

function chapterFromLocation(fallback: Chapter): Chapter {
  if (window.location.pathname === '/0.2' || window.location.hash === '#functions') return '0.2';
  if (window.location.pathname === '/0.1' || window.location.hash === '#mission') return '0.1';
  return fallback;
}

export default function GameRouter({ initialChapter = '0.1' }: { initialChapter?: Chapter }) {
  const [chapter, setChapter] = useState<Chapter>(initialChapter);

  useEffect(() => {
    const syncChapter = () => setChapter(chapterFromLocation(initialChapter));
    syncChapter();
    window.addEventListener('popstate', syncChapter);
    window.addEventListener('hashchange', syncChapter);
    return () => {
      window.removeEventListener('popstate', syncChapter);
      window.removeEventListener('hashchange', syncChapter);
    };
  }, [initialChapter]);

  function openChapter(next: Chapter) {
    setChapter(next);
    window.history.pushState(null, '', next === '0.2' ? '/0.2' : '/0.1');
  }

  return chapter === '0.2' ? (
    <ChapterZeroTwo onBack={() => openChapter('0.1')} />
  ) : (
    <ChapterZeroOne onContinue={() => openChapter('0.2')} />
  );
}
