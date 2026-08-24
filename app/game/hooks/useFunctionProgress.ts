import { useState } from 'react';
import {
  functionConceptOrder,
  initialSquareValues,
  inverseCases,
  machineInputs,
  relationPoints,
  squareDomain,
  type FunctionConceptKey,
  type InverseKind,
} from '../chapterZeroTwo';
import type { AudioCue } from './useGameAudio';

type ProgressOptions = {
  seen: Set<FunctionConceptKey>;
  reducedMotion: boolean;
  playEffect: (cue: AudioCue, force?: boolean) => void;
  showNote: (concept: FunctionConceptKey | null) => void;
};

export type MachineLinks = Record<number, number[]>;
export type CompositionOrder = 'f-g' | 'g-f';

const freshMachineLinks = (): MachineLinks => ({ 0: [], 1: [], 2: [] });

export function useFunctionProgress({
  seen,
  reducedMotion,
  playEffect,
  showNote,
}: ProgressOptions) {
  const [started, setStarted] = useState(false);
  const [stage, setStage] = useState(0);
  const [cutting, setCutting] = useState(false);
  const [solved, setSolved] = useState(false);
  const [message, setMessage] = useState('');
  const [machineLinks, setMachineLinks] = useState<MachineLinks>(freshMachineLinks);
  const [squareValues, setSquareValues] = useState<Record<number, number>>(initialSquareValues);
  const [relationSelection, setRelationSelection] = useState(
    () => new Set(relationPoints.map((point) => point.id)),
  );
  const [compositionOrder, setCompositionOrder] = useState<CompositionOrder | null>(null);
  const [inverseStep, setInverseStep] = useState(0);
  const [inverseWrong, setInverseWrong] = useState(false);
  const [domainRestricted, setDomainRestricted] = useState(false);

  const currentConcept = functionConceptOrder[Math.min(stage, functionConceptOrder.length - 1)];

  function begin() {
    setStarted(true);
    if (!seen.has('function')) {
      window.setTimeout(() => showNote('function'), reducedMotion ? 20 : 620);
    }
  }

  function moveTo(nextStage: number) {
    setCutting(true);
    window.setTimeout(
      () => {
        setStage(nextStage);
        setSolved(false);
        setMessage('');
        setCompositionOrder(null);
        const concept = functionConceptOrder[nextStage];
        if (concept && !seen.has(concept)) showNote(concept);
      },
      reducedMotion ? 15 : 1450,
    );
    window.setTimeout(() => setCutting(false), reducedMotion ? 30 : 3400);
  }

  function toggleMachineLink(input: number, output: number) {
    setMachineLinks((current) => {
      const links = current[input];
      return {
        ...current,
        [input]: links.includes(output)
          ? links.filter((value) => value !== output)
          : [...links, output],
      };
    });
    setMessage('');
  }

  function checkMachine() {
    if (machineInputs.some((input) => machineLinks[input].length !== 1)) {
      playEffect('error');
      setMessage('Every domain input must leave through exactly one wire.');
      return;
    }
    if (machineInputs.some((input) => machineLinks[input][0] !== input + 1)) {
      playEffect('error');
      setMessage('The relay adds one: trace each input through the machine again.');
      return;
    }
    solveAndAdvance('The machine now gives one correct output for every input.', 1);
  }

  function setSquareValue(x: number, y: number) {
    setSquareValues((current) => ({ ...current, [x]: y }));
    setMessage('');
  }

  function checkSquareGraph() {
    if (squareDomain.some((x) => squareValues[x] !== x * x)) {
      playEffect('error');
      setMessage('The forged graph still disagrees with x ↦ x². Drag each signal to its output.');
      return;
    }
    solveAndAdvance('Formula, table, mapping, and graph now describe the same function.', 2);
  }

  function toggleRelationPoint(id: string) {
    setRelationSelection((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setMessage('');
  }

  function checkRelation() {
    const counts = squareDomain.map(
      (x) =>
        relationPoints.filter((point) => point.x === x && relationSelection.has(point.id)).length,
    );
    if (counts.some((count) => count === 0)) {
      playEffect('error');
      setMessage('One input port has no destination. Restore a route before testing the relay.');
      return;
    }
    if (counts.some((count) => count > 1)) {
      playEffect('error');
      setMessage('The relay still hesitates: one input reaches two output channels.');
      return;
    }
    solveAndAdvance('Every input now resolves to exactly one output. The relay locks.', 3);
  }

  function chooseComposition(order: CompositionOrder) {
    setCompositionOrder(order);
    setMessage('');
  }

  function checkComposition() {
    if (compositionOrder !== 'f-g') {
      playEffect('error');
      setMessage('That order sends 1 to 3. Read g ∘ f from right to left: f acts first.');
      return;
    }
    solveAndAdvance('1 passes through f, then g, producing the safe channel 4.', 4);
  }

  function chooseInverse(kind: InverseKind) {
    const currentCase = inverseCases[inverseStep];
    if (kind !== currentCase.answer) {
      playEffect('error');
      setInverseWrong(true);
      setMessage(
        kind === 'injective'
          ? 'Injective means no two inputs collide: every input keeps a distinct destination.'
          : kind === 'surjective'
            ? 'Surjective means every codomain target is reached at least once.'
            : 'Bijective needs both: no collisions and no unreachable codomain targets.',
      );
      window.setTimeout(() => setInverseWrong(false), reducedMotion ? 80 : 620);
      return;
    }

    playEffect('confirm');
    setMessage(currentCase.success);
    if (inverseStep < inverseCases.length - 1) {
      window.setTimeout(
        () => {
          setInverseStep((value) => value + 1);
          setMessage('');
        },
        reducedMotion ? 100 : 900,
      );
      return;
    }
    setSolved(true);
    window.setTimeout(() => moveTo(5), reducedMotion ? 150 : 1900);
  }

  function checkExtraction() {
    if (!domainRestricted) {
      playEffect('error');
      setMessage(
        '−2 and 2 both become 4: q is not injective, so it is not invertible. Restrict the domain.',
      );
      return;
    }
    if (compositionOrder !== 'f-g') {
      playEffect('error');
      setMessage(
        'This route is invertible too: it is injective on the restricted domain, but it reaches 9 instead of 5.',
      );
      return;
    }
    playEffect('confirm');
    setSolved(true);
    setMessage(
      '2 ↦ 4 ↦ 5. The restricted route is injective and invertible, with return 5 ↦ 4 ↦ 2. Extraction clear.',
    );
    window.setTimeout(() => moveTo(6), reducedMotion ? 180 : 3000);
  }

  function solveAndAdvance(success: string, nextStage: number) {
    playEffect('confirm');
    setSolved(true);
    setMessage(success);
    window.setTimeout(() => moveTo(nextStage), reducedMotion ? 150 : 2200);
  }

  function replay() {
    setMachineLinks(freshMachineLinks());
    setSquareValues(initialSquareValues);
    setRelationSelection(new Set(relationPoints.map((point) => point.id)));
    setCompositionOrder(null);
    setInverseStep(0);
    setInverseWrong(false);
    setDomainRestricted(false);
    moveTo(0);
  }

  return {
    started,
    stage,
    cutting,
    solved,
    message,
    currentConcept,
    machineLinks,
    squareValues,
    relationSelection,
    compositionOrder,
    inverseStep,
    inverseWrong,
    domainRestricted,
    begin,
    moveTo,
    toggleMachineLink,
    checkMachine,
    setSquareValue,
    checkSquareGraph,
    toggleRelationPoint,
    checkRelation,
    chooseComposition,
    checkComposition,
    chooseInverse,
    setDomainRestricted,
    checkExtraction,
    replay,
  };
}
