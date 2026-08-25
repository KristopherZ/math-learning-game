import { useState } from 'react';
import { logicConceptOrder, logicScenes, type LogicConceptKey } from '../chapterZeroZero';
import type { AudioCue } from './useGameAudio';

type ProgressOptions = {
  seen: Set<LogicConceptKey>;
  reducedMotion: boolean;
  playEffect: (cue: AudioCue, force?: boolean) => void;
  showNote: (concept: LogicConceptKey | null) => void;
};

export function useLogicProgress({ seen, reducedMotion, playEffect, showNote }: ProgressOptions) {
  const [started, setStarted] = useState(false);
  const [stage, setStage] = useState(0);
  const [solved, setSolved] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [message, setMessage] = useState('');
  const [cutting, setCutting] = useState(false);

  const currentConcept = logicConceptOrder[Math.min(stage, logicConceptOrder.length - 1)];

  function begin() {
    setStarted(true);
    if (!seen.has('and')) {
      window.setTimeout(() => showNote('and'), reducedMotion ? 20 : 620);
    }
  }

  function moveTo(nextStage: number) {
    setCutting(true);
    window.setTimeout(
      () => {
        setStage(nextStage);
        setSolved(false);
        setWrong(false);
        setMessage('');
        const concept = logicConceptOrder[nextStage];
        if (concept && !seen.has(concept)) showNote(concept);
      },
      reducedMotion ? 15 : 1450,
    );
    window.setTimeout(() => setCutting(false), reducedMotion ? 30 : 3400);
  }

  function chooseOption(optionId: string) {
    if (solved || stage >= logicScenes.length) return;
    const scene = logicScenes[stage];
    if (optionId !== scene.answer) {
      playEffect('error');
      setWrong(true);
      setMessage(scene.hint);
      window.setTimeout(() => setWrong(false), reducedMotion ? 80 : 620);
      return;
    }

    playEffect('confirm');
    setWrong(false);
    setSolved(true);
    setMessage(scene.success);
    window.setTimeout(() => moveTo(stage + 1), reducedMotion ? 150 : 2300);
  }

  function replay() {
    setStage(0);
    setSolved(false);
    setWrong(false);
    setMessage('');
    setStarted(true);
  }

  return {
    started,
    stage,
    solved,
    wrong,
    message,
    cutting,
    currentConcept,
    begin,
    chooseOption,
    replay,
  };
}
