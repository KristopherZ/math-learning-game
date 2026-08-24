import { MathTex } from '../../MathTex';
import { inverseCases, type InverseKind } from '../chapterZeroTwo';
import { cx } from '../cn';
import { Agent } from '../components/Agent';
import { MappingDiagram } from './MappingDiagram';

const inverseChoices: Array<{ kind: InverseKind; label: string; tex: string }> = [
  { kind: 'injective', label: 'injective · one-to-one', tex: String.raw`f(a)=f(b)\Rightarrow a=b` },
  { kind: 'surjective', label: 'surjective · onto', tex: String.raw`\operatorname{im}(f)=B` },
  { kind: 'bijective', label: 'bijective · both', tex: String.raw`f:A\xrightarrow{\sim}B` },
];

export function InverseScene({
  step,
  solved,
  wrong,
  message,
  onChoose,
}: {
  step: number;
  solved: boolean;
  wrong: boolean;
  message: string;
  onChoose: (kind: InverseKind) => void;
}) {
  const mapping = inverseCases[step];
  return (
    <section
      className={cx(
        'world-scene',
        'function-scene',
        'inverse-scene',
        wrong && 'wrong',
        solved && 'solved',
      )}
      aria-label="intercepted message relay investigation"
    >
      <div className="scene-number">0.2</div>
      <p className="scene-whisper">
        one intercepted fragment, three relay maps: recover its sender and destination
      </p>
      <div className="function-header">
        <MathTex tex={String.raw`f\colon A\to B`} fallback="f: A → B" className="math-tex" />
      </div>
      <div className="inverse-progress" aria-label={`relay classification ${step + 1} of 3`}>
        {[0, 1, 2].map((index) => (
          <i key={index} className={cx(index < step && 'passed', index === step && 'active')} />
        ))}
      </div>
      <p className="inverse-prompt">{mapping.prompt}</p>
      <div className="mapping-frame" key={mapping.id}>
        <MappingDiagram mapping={mapping} />
      </div>
      <div className="inverse-tools">
        {inverseChoices.map((choice) => (
          <button type="button" key={choice.kind} onClick={() => onChoose(choice.kind)}>
            <MathTex tex={choice.tex} fallback={choice.label} className="math-tex" />
            <small>{choice.label}</small>
          </button>
        ))}
      </div>
      <Agent crossing={solved} />
      <p className="scene-message">{message}</p>
    </section>
  );
}
