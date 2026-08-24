import { conceptTex, MathTex, plainSetToTex } from '../../MathTex';
import { cipherSteps, conceptNotes, type ConceptKey } from '../chapterZeroOne';
import { cx } from '../cn';
import { Agent } from './Agent';

const cipherConcepts: ConceptKey[] = ['union', 'intersection', 'difference', 'cartesian'];

type CipherSceneProps = {
  stepIndex: number;
  solved: boolean;
  wrong: boolean;
  applied: ConceptKey | null;
  message: string;
  onChoose: (concept: ConceptKey) => void;
};

export function CipherScene({
  stepIndex,
  solved,
  wrong,
  applied,
  message,
  onChoose,
}: CipherSceneProps) {
  const step = cipherSteps[Math.min(stepIndex, cipherSteps.length - 1)];
  const finalStep = stepIndex === cipherSteps.length - 1;
  const resultVisible = finalStep ? solved : applied === step.concept;

  return (
    <section
      className={cx(
        'world-scene',
        'cipher-scene',
        solved && 'solved',
        wrong && 'wrong',
        applied && 'applying',
      )}
      aria-label="combined set-operation secret-code puzzle"
    >
      <div className="scene-number">0.1</div>
      <p className="scene-whisper">
        decipher the copied strip—choose the set tool that performs each instruction
      </p>
      <div className="cipher-thread" aria-hidden="true">
        {cipherSteps.map((_, index) => (
          <i
            key={index}
            className={cx(
              index < stepIndex && 'passed',
              index === stepIndex && 'active',
              index === stepIndex && applied && 'resolving',
            )}
          />
        ))}
      </div>

      <div className="cipher-instruction" key={`instruction-${stepIndex}`}>
        <small>{String(Math.min(stepIndex + 1, 5)).padStart(2, '0')}</small>
        <p>{step.instruction}</p>
      </div>

      <div className="cipher-equation" key={`equation-${stepIndex}`} aria-live="polite">
        {solved ? (
          <div className="final-code-line">
            <code>
              <MathTex
                tex={plainSetToTex(step.result)}
                fallback={step.result}
                className="math-tex"
              />
            </code>
            <i>→</i>
            <strong>code 22</strong>
          </div>
        ) : (
          <>
            <MathTex tex={plainSetToTex(step.left)} fallback={step.left} className="math-tex" />
            <b className="cipher-gap">
              {applied ? (
                <MathTex
                  tex={conceptTex[applied]}
                  fallback={conceptNotes[applied].symbol}
                  className="math-tex"
                />
              ) : (
                '?'
              )}
            </b>
            <MathTex tex={plainSetToTex(step.right)} fallback={step.right} className="math-tex" />
            <i>→</i>
            <code className={cx(!resultVisible && 'cipher-masked')}>
              {resultVisible ? (
                <MathTex
                  tex={plainSetToTex(step.result)}
                  fallback={step.result}
                  className="math-tex"
                />
              ) : (
                '••••'
              )}
            </code>
          </>
        )}
      </div>

      <div className="cipher-tools" aria-label="set tools">
        {cipherConcepts.map((concept) => (
          <button
            type="button"
            key={concept}
            className={cx(applied === concept && 'chosen')}
            aria-label={`use ${concept}`}
            disabled={solved || Boolean(applied)}
            onClick={() => onChoose(concept)}
          >
            <strong className={`operator-${concept}`}>
              <MathTex
                tex={conceptTex[concept]}
                fallback={conceptNotes[concept].symbol}
                className="math-tex"
              />
            </strong>
            <span>{concept}</span>
          </button>
        ))}
      </div>

      <Agent crossing={solved} blocked={wrong} />
      <p className="scene-message" aria-live="polite">
        {message}
      </p>
    </section>
  );
}
