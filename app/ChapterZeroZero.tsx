'use client';

import {
  CinematicCut,
  QuietControls,
  RotatePrompt,
  SoundToggle,
} from './game/components/GameChrome';
import { ScreenBlock } from './game/components/ScreenBlock';
import { cx } from './game/cn';
import { LogicBriefing } from './game/logic/LogicBriefing';
import { LogicConceptNote } from './game/logic/LogicConceptNote';
import { LogicEnding } from './game/logic/LogicEnding';
import { LogicScene } from './game/logic/LogicScene';
import { useGameAudio } from './game/hooks/useGameAudio';
import { useLogicPreferences } from './game/hooks/useLogicPreferences';
import { useLogicProgress } from './game/hooks/useLogicProgress';
import { useProximityHighlight } from './game/hooks/useProximityHighlight';
import { requestMobileFullscreen, useScreenAccess } from './game/hooks/useScreenAccess';
import { logicProgress } from './game/chapterZeroZero';

export default function ChapterZeroZero({ onContinue }: { onContinue: () => void }) {
  const screenAccess = useScreenAccess();
  const preferences = useLogicPreferences();
  const audio = useGameAudio();
  const game = useLogicProgress({
    seen: preferences.seen,
    reducedMotion: preferences.reducedMotion,
    playEffect: audio.playEffect,
    showNote: preferences.showNote,
  });

  useProximityHighlight(game.stage, Boolean(preferences.note));

  function beginLogic() {
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
      className={cx('minimal-game', 'logic-game', preferences.reducedMotion && 'reduce-motion')}
      onPointerDown={(event) => {
        if (game.started && audio.soundOn && (event.target as HTMLElement).closest('button')) {
          audio.playEffect('click');
        }
      }}
    >
      <RotatePrompt />
      {!game.started && <LogicBriefing onBegin={beginLogic} />}
      {game.started && game.stage < logicProgress.length && (
        <LogicScene
          stage={game.stage}
          solved={game.solved}
          wrong={game.wrong}
          message={game.message}
          onChoose={game.chooseOption}
        />
      )}
      {game.started && game.stage >= logicProgress.length && (
        <LogicEnding onReplay={game.replay} onContinue={onContinue} />
      )}

      <span className="demo-mark">demo</span>
      {game.started && <SoundToggle soundOn={audio.soundOn} onToggle={audio.toggleSound} />}
      {game.started && (
        <QuietControls
          stage={game.stage}
          progress={logicProgress}
          onHelp={() => preferences.showNote(game.currentConcept)}
        />
      )}
      <CinematicCut playing={game.cutting} />
      {preferences.note && (
        <LogicConceptNote concept={preferences.note} onClose={preferences.closeNote} />
      )}
    </main>
  );
}
