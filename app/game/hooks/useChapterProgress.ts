import { useState } from 'react';
import {
  cipherSteps,
  conceptNotes,
  doorScenes,
  equalSets,
  requiredCopies,
  type ConceptKey,
  type ObjectKind,
} from '../chapterZeroOne';
import type { AudioCue } from './useGameAudio';

type ProgressOptions = {
  seen: Set<ConceptKey>;
  reducedMotion: boolean;
  playEffect: (cue: AudioCue, force?: boolean) => void;
  showNote: (concept: ConceptKey | null) => void;
  startAtStage?: number | null;
};

export const chapterProgress = [0, 1, 2, 3, 4, 5];

export function useChapterProgress({
  seen,
  reducedMotion,
  playEffect,
  showNote,
  startAtStage = null,
}: ProgressOptions) {
  const hasStartStage = startAtStage !== null && startAtStage !== undefined;
  const [started, setStarted] = useState(hasStartStage);
  const [stage, setStage] = useState(startAtStage ?? 0);
  const [selection, setSelection] = useState<string[]>([]);
  const [result, setResult] = useState<ObjectKind[]>([]);
  const [solved, setSolved] = useState(false);
  const [caught, setCaught] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [message, setMessage] = useState('');
  const [cutting, setCutting] = useState(false);
  const [cipherStep, setCipherStep] = useState(0);
  const [cipherWrong, setCipherWrong] = useState(false);
  const [cipherApplied, setCipherApplied] = useState<ConceptKey | null>(null);

  const currentConcept: ConceptKey =
    stage === 0
      ? 'equality'
      : stage < 4
        ? doorScenes[stage - 1].concept
        : stage === 4
          ? 'cartesian'
          : cipherSteps[Math.min(cipherStep, cipherSteps.length - 1)].concept;

  function begin() {
    setStarted(true);
    if (!seen.has('equality')) {
      window.setTimeout(() => showNote('equality'), reducedMotion ? 20 : 620);
    }
  }

  function moveTo(nextStage: number) {
    setCutting(true);
    window.setTimeout(
      () => {
        setStage(nextStage);
        setSelection([]);
        setResult([]);
        setSolved(false);
        setCaught(false);
        setBlocked(false);
        setMessage('');
        setCipherWrong(false);
        setCipherApplied(null);
        if (nextStage > 0 && nextStage < 5) {
          const concept = nextStage === 4 ? 'cartesian' : doorScenes[nextStage - 1].concept;
          if (!seen.has(concept)) showNote(concept);
        }
      },
      reducedMotion ? 15 : 1450,
    );
    window.setTimeout(() => setCutting(false), reducedMotion ? 30 : 3400);
  }

  function togglePhoneItem(id: string) {
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
    setMessage('');
  }

  function toggleResult(kind: ObjectKind) {
    setResult((current) =>
      current.includes(kind) ? current.filter((item) => item !== kind) : [...current, kind],
    );
    setSolved(false);
    setCaught(false);
    setBlocked(false);
    setMessage('');
  }

  function checkResult() {
    const scene = doorScenes[stage - 1];
    const correct = equalSets(result, scene.expected);
    setSolved(correct);
    if (correct) {
      playEffect(scene.concept === 'difference' ? 'drop' : 'confirm');
      setCaught(false);
      setBlocked(false);
      setMessage(scene.success);
      window.setTimeout(() => moveTo(stage + 1), reducedMotion ? 150 : 2400);
      return;
    }
    if (scene.concept === 'difference') {
      if (result.includes('tracker')) {
        playEffect('error');
        setBlocked(false);
        setCaught(true);
        setMessage(`caught — ${scene.caughtHint || scene.hint}`);
        window.setTimeout(() => setCaught(false), reducedMotion ? 120 : 1350);
      } else {
        playEffect('error');
        setCaught(false);
        setBlocked(true);
        setMessage(`stopped — ${scene.missingHint || scene.hint}`);
        window.setTimeout(() => setBlocked(false), reducedMotion ? 80 : 650);
      }
      return;
    }
    playEffect('error');
    setCaught(false);
    setMessage(scene.hint);
  }

  function toggleCopy(pair: string) {
    setSelection((current) =>
      current.includes(pair) ? current.filter((item) => item !== pair) : [...current, pair],
    );
    setSolved(false);
    setMessage('');
  }

  function checkCopies() {
    const correct = equalSets(selection, requiredCopies);
    setSolved(correct);
    if (!correct) {
      playEffect('error');
      setMessage('Every file needs one ordered pair with each archive slot.');
      return;
    }
    playEffect('confirm');
    setMessage('Four paired copies are complete. The final strip contains an encrypted code.');
    window.setTimeout(() => moveTo(5), reducedMotion ? 150 : 2500);
  }

  function chooseCipherTool(concept: ConceptKey) {
    if (cipherApplied) return;
    const step = cipherSteps[cipherStep];
    if (concept !== step.concept) {
      playEffect('error');
      setCipherWrong(true);
      setMessage('The strips misalign—match the instruction to the operation.');
      window.setTimeout(() => setCipherWrong(false), reducedMotion ? 100 : 620);
      return;
    }

    setCipherWrong(false);
    playEffect('confirm');
    setCipherApplied(concept);
    if (cipherStep === cipherSteps.length - 1) {
      setMessage('The signatures align. Decoding the final signal…');
      window.setTimeout(
        () => {
          setSolved(true);
          setMessage('The pair sets match. Code 22 opens the extraction signal.');
        },
        reducedMotion ? 60 : 760,
      );
      window.setTimeout(() => moveTo(6), reducedMotion ? 220 : 3300);
      return;
    }

    setMessage(`${conceptNotes[concept].symbol} routing the signal…`);
    window.setTimeout(
      () => {
        setCipherStep((current) => current + 1);
        setCipherApplied(null);
        setMessage('');
      },
      reducedMotion ? 70 : 720,
    );
  }

  function replay() {
    setCipherStep(0);
    moveTo(0);
  }

  return {
    started,
    stage,
    selection,
    result,
    solved,
    caught,
    blocked,
    message,
    cutting,
    cipherStep,
    cipherWrong,
    cipherApplied,
    currentConcept,
    begin,
    moveTo,
    togglePhoneItem,
    toggleResult,
    checkResult,
    toggleCopy,
    checkCopies,
    chooseCipherTool,
    replay,
  };
}
