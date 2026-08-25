import { MathTex } from '../../MathTex';
import {
  logicConceptNotes,
  logicOperatorTex,
  logicScenes,
  type LogicConceptKey,
} from '../chapterZeroZero';
import { cx } from '../cn';
import { Agent } from '../components/Agent';

type LogicSceneProps = {
  stage: number;
  solved: boolean;
  wrong: boolean;
  selectedOperator: LogicConceptKey | null;
  message: string;
  onChoose: (concept: LogicConceptKey) => void;
  onCommit: () => void;
};

export function LogicScene({
  stage,
  solved,
  wrong,
  selectedOperator,
  message,
  onChoose,
  onCommit,
}: LogicSceneProps) {
  const scene = logicScenes[Math.min(stage, logicScenes.length - 1)];
  const selectedIsCorrect = selectedOperator === scene.answer;
  const operatorLabel = selectedOperator ? logicConceptNotes[selectedOperator].symbol : '?';

  return (
    <section
      className={cx(
        'world-scene',
        'logic-scene',
        `logic-${scene.concept}`,
        selectedOperator && `logic-selected-${selectedOperator}`,
        solved && 'solved',
        wrong && 'wrong',
      )}
      aria-label={`${scene.concept} dialog puzzle`}
    >
      <div className="scene-number">0.0</div>
      <p className="logic-whisper">{scene.prompt}</p>

      <div className="logic-dialogue" aria-live="polite">
        <div className="logic-dialogue-line archive-line">
          <small>door status</small>
          <p>{scene.archiveLine}</p>
        </div>
        <div className="logic-dialogue-line e-line">
          <small>e</small>
          <p>{scene.eLine}</p>
        </div>
      </div>

      <div className={cx('logic-world', selectedIsCorrect && 'reacted')} aria-hidden="true">
        <div className="logic-world-label">exit</div>
        <div className="logic-door-system">
          <div className="logic-hatch">
            <i />
          </div>
        </div>
        <small>{selectedIsCorrect ? 'open' : 'sealed'}</small>
      </div>

      <div className={cx('logic-sentence-board', solved && 'committed')}>
        <small className="logic-board-label">edit the sentence</small>
        <div className="logic-sentence" aria-live="polite">
          {scene.mode === 'before' || scene.mode === 'quantifier' ? (
            <span className={cx('logic-operator-slot', selectedOperator && 'filled')}>
              {selectedOperator ? (
                <MathTex tex={logicOperatorTex[selectedOperator]} fallback={operatorLabel} />
              ) : (
                '?'
              )}
            </span>
          ) : null}
          {scene.mode === 'between' ? (
            <>
              <span className="logic-claim">{scene.leftClaim}</span>
              <span className={cx('logic-operator-slot', selectedOperator && 'filled')}>
                {selectedOperator ? (
                  <MathTex tex={logicOperatorTex[selectedOperator]} fallback={operatorLabel} />
                ) : (
                  '?'
                )}
              </span>
              <span className="logic-claim">{scene.rightClaim}</span>
            </>
          ) : (
            <span className="logic-claim">{scene.rightClaim}</span>
          )}
        </div>
        <p className={cx('logic-reaction', selectedOperator && 'visible')}>
          {selectedOperator
            ? selectedIsCorrect
              ? scene.previewCorrect
              : scene.previewWrong
            : 'Choose a symbol to change the sentence.'}
        </p>
        <button
          type="button"
          className="game-action logic-commit"
          onClick={onCommit}
          disabled={solved}
        >
          {solved ? 'sentence sent' : 'send sentence'}
        </button>
      </div>

      <div className="logic-symbol-rail" aria-label="logic symbols">
        <small>symbols</small>
        <div>
          {scene.available.map((concept) => (
            <button
              type="button"
              key={concept}
              className={cx(selectedOperator === concept && 'selected')}
              onClick={() => onChoose(concept)}
              disabled={solved}
              aria-label={`insert ${concept}`}
            >
              <MathTex
                tex={logicOperatorTex[concept]}
                fallback={logicConceptNotes[concept].symbol}
              />
              <span>{concept}</span>
            </button>
          ))}
        </div>
      </div>

      <Agent crossing={solved} exitDirection="right" />
      <p className="scene-message" aria-live="polite">
        {message}
      </p>
    </section>
  );
}
