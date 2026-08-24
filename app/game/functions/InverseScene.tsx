import { MathTex } from '../../MathTex';
import { inverseCases, type InverseKind } from '../chapterZeroTwo';
import { cx } from '../cn';
import { Agent } from '../components/Agent';
import { MappingDiagram } from './MappingDiagram';

const inverseChoices: Array<{ kind: InverseKind; label: string; tex: string }> = [
  { kind: 'left', label: 'left inverse', tex: String.raw`\ell\circ f=\mathrm{id}_{A}` },
  { kind: 'right', label: 'right inverse', tex: String.raw`f\circ r=\mathrm{id}_{B}` },
  { kind: 'total', label: 'two-sided', tex: 'f^{-1}' },
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
      aria-label="inverse return tunnels"
    >
      <div className="scene-number">0.2</div>
      <p className="scene-whisper">
        fit the weakest return cable that guarantees the stated recovery
      </p>
      <div className="function-header">
        <MathTex tex={String.raw`f\colon A\to B`} fallback="f: A → B" className="math-tex" />
      </div>
      <div className="inverse-progress" aria-label={`return tunnel ${step + 1} of 3`}>
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
