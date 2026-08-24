'use client';

import { useState } from 'react';

import { CartesianScene } from './game/components/CartesianScene';
import { CipherScene } from './game/components/CipherScene';
import { ConceptNote } from './game/components/ConceptNote';
import { Ending } from './game/components/Ending';
import {
  CinematicCut,
  QuietControls,
  RotatePrompt,
  SoundToggle,
} from './game/components/GameChrome';
import { OperationScene } from './game/components/OperationScene';
import { PhoneScene } from './game/components/PhoneScene';
import { Prologue } from './game/components/Prologue';
import { SetBriefing } from './game/components/SetBriefing';
import { ScreenBlock } from './game/components/ScreenBlock';
import { cx } from './game/cn';
import { chapterProgress, useChapterProgress } from './game/hooks/useChapterProgress';
import { useGameAudio } from './game/hooks/useGameAudio';
import { useGamePreferences } from './game/hooks/useGamePreferences';
import { useProximityHighlight } from './game/hooks/useProximityHighlight';
import { requestMobileFullscreen, useScreenAccess } from './game/hooks/useScreenAccess';

export default function ChapterZeroOne({
  onContinue,
  startAtBriefing = false,
}: {
  onContinue?: () => void;
  startAtBriefing?: boolean;
}) {
  const [briefing, setBriefing] = useState(startAtBriefing);
  const screenAccess = useScreenAccess();
  const preferences = useGamePreferences();
  const audio = useGameAudio();
  const game = useChapterProgress({
    seen: preferences.seen,
    reducedMotion: preferences.reducedMotion,
    playEffect: audio.playEffect,
    showNote: preferences.showNote,
  });

  useProximityHighlight(game.stage, Boolean(preferences.note));

  function beginDemo() {
    requestMobileFullscreen();
    audio.enableSound();
    audio.playEffect('confirm', true);
    setBriefing(true);
  }

  function beginArchive() {
    audio.playEffect('confirm');
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
      className={cx('minimal-game', preferences.reducedMotion && 'reduce-motion')}
      onPointerDown={(event) => {
        if (game.started && audio.soundOn && (event.target as HTMLElement).closest('button')) {
          audio.playEffect('click');
        }
      }}
    >
      <RotatePrompt />

      {!game.started && !briefing && <Prologue onBegin={beginDemo} />}
      {!game.started && briefing && <SetBriefing onBegin={beginArchive} />}

      {game.started && game.stage === 0 && (
        <PhoneScene
          selected={game.selection}
          message={game.message}
          onToggle={game.togglePhoneItem}
          onRead={() => game.moveTo(1)}
        />
      )}
      {game.started && game.stage > 0 && game.stage < 4 && (
        <OperationScene
          stage={game.stage}
          result={game.result}
          solved={game.solved}
          caught={game.caught}
          blocked={game.blocked}
          message={game.message}
          onToggle={game.toggleResult}
          onCheck={game.checkResult}
        />
      )}
      {game.started && game.stage === 4 && (
        <CartesianScene
          selected={game.selection}
          solved={game.solved}
          message={game.message}
          onToggle={game.toggleCopy}
          onCheck={game.checkCopies}
        />
      )}
      {game.started && game.stage === 5 && (
        <CipherScene
          stepIndex={game.cipherStep}
          solved={game.solved}
          wrong={game.cipherWrong}
          applied={game.cipherApplied}
          message={game.message}
          onChoose={game.chooseCipherTool}
        />
      )}
      {game.started && game.stage === 6 && (
        <Ending onReplay={game.replay} onContinue={onContinue} />
      )}

      <span className="demo-mark">demo</span>
      {game.started && <SoundToggle soundOn={audio.soundOn} onToggle={audio.toggleSound} />}
      {game.started && (
        <QuietControls
          stage={game.stage}
          progress={chapterProgress}
          onHelp={() => preferences.showNote(game.currentConcept)}
        />
      )}

      <CinematicCut playing={game.cutting} />
      {preferences.note && (
        <ConceptNote concept={preferences.note} onClose={preferences.closeNote} />
      )}
    </main>
  );
}
