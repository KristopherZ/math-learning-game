'use client';

import { functionChapterProgress } from './game/chapterZeroTwo';
import { FunctionBriefing } from './game/functions/FunctionBriefing';
import { FunctionConceptNote } from './game/functions/FunctionConceptNote';
import { FunctionEnding } from './game/functions/FunctionEnding';
import { CompositionScene } from './game/functions/CompositionScene';
import { ExtractionScene } from './game/functions/ExtractionScene';
import { GraphScene } from './game/functions/GraphScene';
import { InverseScene } from './game/functions/InverseScene';
import { MachineScene } from './game/functions/MachineScene';
import { RelationScene } from './game/functions/RelationScene';
import {
  CinematicCut,
  QuietControls,
  RotatePrompt,
  SoundToggle,
} from './game/components/GameChrome';
import { ScreenBlock } from './game/components/ScreenBlock';
import { cx } from './game/cn';
import { useFunctionPreferences } from './game/hooks/useFunctionPreferences';
import { useFunctionProgress } from './game/hooks/useFunctionProgress';
import { useGameAudio } from './game/hooks/useGameAudio';
import { useProximityHighlight } from './game/hooks/useProximityHighlight';
import { requestMobileFullscreen, useScreenAccess } from './game/hooks/useScreenAccess';

export default function ChapterZeroTwo({
  onBack,
  startAtStage = null,
}: {
  onBack: () => void;
  startAtStage?: number | null;
}) {
  const screenAccess = useScreenAccess();
  const preferences = useFunctionPreferences();
  const audio = useGameAudio();
  const game = useFunctionProgress({
    seen: preferences.seen,
    reducedMotion: preferences.reducedMotion,
    playEffect: audio.playEffect,
    showNote: preferences.showNote,
    startAtStage,
  });

  useProximityHighlight(game.stage, Boolean(preferences.note));

  function beginChapter() {
    requestMobileFullscreen();
    audio.enableSound();
    audio.playEffect('confirm', true);
    game.begin();
  }

  if (screenAccess !== 'supported') {
    return (
      <main className="minimal-game device-gate" aria-live="polite">
        {screenAccess === 'blocked' ? (
          <ScreenBlock />
        ) : (
          <span className="device-checking">checking screen</span>
        )}
      </main>
    );
  }

  return (
    <main
      className={cx('minimal-game', 'functions-game', preferences.reducedMotion && 'reduce-motion')}
      onPointerDown={(event) => {
        if (game.started && audio.soundOn && (event.target as HTMLElement).closest('button'))
          audio.playEffect('click');
      }}
    >
      <RotatePrompt />
      {!game.started && <FunctionBriefing onBegin={beginChapter} onBack={onBack} />}
      {game.started && game.stage === 0 && (
        <MachineScene
          links={game.machineLinks}
          solved={game.solved}
          message={game.message}
          onToggle={game.toggleMachineLink}
          onCheck={game.checkMachine}
        />
      )}
      {game.started && game.stage === 1 && (
        <GraphScene
          values={game.squareValues}
          solved={game.solved}
          message={game.message}
          onChange={game.setSquareValue}
          onCheck={game.checkSquareGraph}
        />
      )}
      {game.started && game.stage === 2 && (
        <RelationScene
          selected={game.relationSelection}
          solved={game.solved}
          message={game.message}
          onToggle={game.toggleRelationPoint}
          onCheck={game.checkRelation}
        />
      )}
      {game.started && game.stage === 3 && (
        <CompositionScene
          order={game.compositionOrder}
          solved={game.solved}
          message={game.message}
          onChoose={game.chooseComposition}
          onCheck={game.checkComposition}
        />
      )}
      {game.started && game.stage === 4 && (
        <InverseScene
          step={game.inverseStep}
          solved={game.solved}
          revealed={game.inverseRevealed}
          wrong={game.inverseWrong}
          message={game.message}
          onChoose={game.chooseInverse}
        />
      )}
      {game.started && game.stage === 5 && (
        <ExtractionScene
          restricted={game.domainRestricted}
          order={game.compositionOrder}
          solved={game.solved}
          message={game.message}
          onRestrict={game.setDomainRestricted}
          onChooseOrder={game.chooseComposition}
          onCheck={game.checkExtraction}
        />
      )}
      {game.started && game.stage === 6 && (
        <FunctionEnding onReplay={game.replay} onBack={onBack} />
      )}

      <span className="demo-mark">demo</span>
      {game.started && <SoundToggle soundOn={audio.soundOn} onToggle={audio.toggleSound} />}
      {game.started && (
        <QuietControls
          stage={game.stage}
          progress={functionChapterProgress}
          onHelp={() => preferences.showNote(game.currentConcept)}
        />
      )}
      <CinematicCut playing={game.cutting} />
      {preferences.note && (
        <FunctionConceptNote concept={preferences.note} onClose={preferences.closeNote} />
      )}
    </main>
  );
}
