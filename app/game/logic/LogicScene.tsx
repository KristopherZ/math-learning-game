import { MathTex } from '../../MathTex';
import { logicScenes } from '../chapterZeroZero';
import { cx } from '../cn';
import { Agent } from '../components/Agent';

type LogicSceneProps = {
  stage: number;
  solved: boolean;
  wrong: boolean;
  message: string;
  onChoose: (optionId: string) => void;
};

export function LogicScene({ stage, solved, wrong, message, onChoose }: LogicSceneProps) {
  const scene = logicScenes[Math.min(stage, logicScenes.length - 1)];

  return (
    <section
      className={cx(
        'world-scene',
        'logic-scene',
        `logic-${scene.concept}`,
        solved && 'solved',
        wrong && 'wrong',
      )}
      aria-label={`${scene.concept} dialog puzzle`}
    >
      <div className="scene-number">0.0</div>
      <p className="logic-whisper">{scene.prompt}</p>

      <div className="logic-dialogue" aria-live="polite">
        <div className="logic-dialogue-line archive-line">
          <small>archive</small>
          <p>{scene.archiveLine}</p>
        </div>
        <div className="logic-dialogue-line e-line">
          <small>e</small>
          <p>{scene.eLine}</p>
        </div>
      </div>

      <div className="logic-terminal" aria-label="current logical form">
        <small>translate the dialog</small>
        <MathTex tex={scene.expression} fallback={scene.expressionFallback} className="math-tex" />
      </div>

      <div className="logic-choices" aria-label="possible logical readings">
        {scene.options.map((option) => (
          <button
            type="button"
            key={option.id}
            className={cx(solved && option.id === scene.answer && 'correct')}
            disabled={solved}
            onClick={() => onChoose(option.id)}
          >
            <MathTex tex={option.tex} fallback={option.fallback} className="math-tex" />
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      <div className={cx('logic-door', solved && 'open')} aria-hidden="true">
        <i />
        <b>{solved ? 'open' : 'sealed'}</b>
      </div>
      <Agent crossing={solved} exitDirection={stage % 2 === 0 ? 'right' : 'left'} />
      <p className="scene-message" aria-live="polite">
        {message}
      </p>
    </section>
  );
}
