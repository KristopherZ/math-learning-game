import { useState } from 'react';
import { logicConceptOrder, logicScenes, type LogicConceptKey } from '../chapterZeroZero';
import type { AudioCue } from './useGameAudio';

type ProgressOptions = {
  seen: Set<LogicConceptKey>;
  reducedMotion: boolean;
  playEffect: (cue: AudioCue, force?: boolean) => void;
  showNote: (concept: LogicConceptKey | null) => void;
  startAtStage?: number | null;
};

export function useLogicProgress({
  seen,
  reducedMotion,
  playEffect,
  showNote,
  startAtStage = null,
}: ProgressOptions) {
  const hasStartStage = startAtStage !== null && startAtStage !== undefined;
  const [started, setStarted] = useState(hasStartStage);
  const [stage, setStage] = useState(startAtStage ?? 0);
  const [solved, setSolved] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<LogicConceptKey | null>(null);
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
        setSelectedOperator(null);
        setMessage('');
        const concept = logicConceptOrder[nextStage];
        if (concept && !seen.has(concept)) showNote(concept);
      },
      reducedMotion ? 15 : 1450,
    );
    window.setTimeout(() => setCutting(false), reducedMotion ? 30 : 3400);
  }

  function chooseOperator(concept: LogicConceptKey) {
    if (solved || stage >= logicScenes.length) return;
    setSelectedOperator(concept);
    setWrong(false);
    setMessage('');
  }

  function commitSentence() {
    if (solved || stage >= logicScenes.length) return;
    const scene = logicScenes[stage];
    if (!selectedOperator) {
      playEffect('error');
      setMessage('Choose a symbol and place it into the sentence first.');
      return;
    }
    if (selectedOperator !== scene.answer) {
      playEffect('error');
      setWrong(true);
      setMessage(scene.previewWrong);
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
    selectedOperator,
    chooseOperator,
    commitSentence,
    replay,
  };
}
