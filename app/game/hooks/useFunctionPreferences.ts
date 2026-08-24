import { useEffect, useState } from 'react';
import type { FunctionConceptKey } from '../chapterZeroTwo';

const SEEN_KEY = 'project-proof-functions-seen-concepts';

export function useFunctionPreferences() {
  const [note, setNote] = useState<FunctionConceptKey | null>(null);
  const [seen, setSeen] = useState<Set<FunctionConceptKey>>(new Set());
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = new Set<FunctionConceptKey>(
        JSON.parse(localStorage.getItem(SEEN_KEY) || '[]'),
      );
      setSeen(stored);
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function closeNote() {
    if (!note) return;
    const next = new Set(seen).add(note);
    setSeen(next);
    localStorage.setItem(SEEN_KEY, JSON.stringify([...next]));
    setNote(null);
  }

  return { note, seen, reducedMotion, showNote: setNote, closeNote };
}
