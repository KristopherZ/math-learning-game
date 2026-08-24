import { cx } from '../cn';
import { Agent } from './Agent';

export function RotatePrompt() {
  return (
    <div className="rotate-prompt" role="status" aria-live="polite">
      <span className="rotate-device" aria-hidden="true">
        <i />
      </span>
      <p>turn your phone sideways</p>
      <small>Project: Proof plays in landscape.</small>
    </div>
  );
}

export function SoundToggle({ soundOn, onToggle }: { soundOn: boolean; onToggle: () => void }) {
  return (
    <button
      className="sound-toggle"
      type="button"
      onClick={onToggle}
      aria-label={soundOn ? 'mute sound' : 'turn sound on'}
      aria-pressed={soundOn}
    >
      <i />
      <i />
      <i />
    </button>
  );
}

type QuietControlsProps = {
  stage: number;
  progress: number[];
  onHelp: () => void;
};

export function QuietControls({ stage, progress, onHelp }: QuietControlsProps) {
  const visibleStage = Math.min(stage, 5);
  return (
    <div className="quiet-controls">
      <button type="button" onClick={onHelp} aria-label="show concept note">
        ?
      </button>
      <div aria-label={`scene ${visibleStage + 1} of 6`}>
        {progress.map((step) => (
          <i
            key={step}
            className={cx(step === visibleStage && 'active', step < stage && 'passed')}
          />
        ))}
      </div>
    </div>
  );
}

export function CinematicCut({ playing }: { playing: boolean }) {
  return (
    <div className={cx('cinematic-cut', playing && 'play')} aria-hidden="true">
      <div className="transition-panel" />
      <div className="transition-panel transition-panel-middle">
        <div className="transition-stage">
          <div className="transition-chase">
            <div className="transition-runner">
              <Agent />
            </div>
          </div>
        </div>
      </div>
      <div className="transition-panel" />
    </div>
  );
}
