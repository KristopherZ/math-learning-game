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

export default function GameRouter({
  initialChapter = '0.1',
  startAtChapterBriefing = false,
}: {
  initialChapter?: Chapter;
  startAtChapterBriefing?: boolean;
}) {
  const [chapter, setChapter] = useState<Chapter>(initialChapter);
  const [chapterOneBriefing, setChapterOneBriefing] = useState(
    initialChapter === '0.1' && startAtChapterBriefing,
  );

  useEffect(() => {
    const syncChapter = () => {
      setChapter(chapterFromLocation(initialChapter));
      setChapterOneBriefing(initialChapter === '0.1' && startAtChapterBriefing);
    };
    syncChapter();
    window.addEventListener('popstate', syncChapter);
    window.addEventListener('hashchange', syncChapter);
    return () => {
      window.removeEventListener('popstate', syncChapter);
      window.removeEventListener('hashchange', syncChapter);
    };
  }, [initialChapter, startAtChapterBriefing]);

  function openChapter(next: Chapter, options?: { chapterOneBriefing?: boolean }) {
    setChapter(next);
    setChapterOneBriefing(next === '0.1' && Boolean(options?.chapterOneBriefing));
    window.history.pushState(null, '', next === '0.2' ? '/0.2' : '/0.1');
  }

  return chapter === '0.2' ? (
    <ChapterZeroTwo onBack={() => openChapter('0.1', { chapterOneBriefing: true })} />
  ) : (
    <ChapterZeroOne startAtBriefing={chapterOneBriefing} onContinue={() => openChapter('0.2')} />
  );
}
