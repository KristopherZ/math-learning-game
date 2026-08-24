import { MathTex } from '../../MathTex';
import { Agent } from '../components/Agent';
import type { CompositionOrder } from '../hooks/useFunctionProgress';

export function CompositionScene({
  order,
  solved,
  message,
  onChoose,
  onCheck,
}: {
  order: CompositionOrder | null;
  solved: boolean;
  message: string;
  onChoose: (order: CompositionOrder) => void;
  onCheck: () => void;
}) {
  const visibleOrder = order ?? 'g-f';
  const correct = visibleOrder === 'f-g';
  const output = correct ? 4 : 3;
  return (
    <section
      className={`world-scene function-scene composition-scene ${solved ? 'solved' : ''}`}
      aria-label="function composition escape route"
    >
      <div className="scene-number">0.2</div>
      <p className="scene-whisper">
        the safe channel is 4 — arrange the machines so input 1 reaches it
      </p>
      <div className="function-header">
        <MathTex
          tex={String.raw`f(x)=x+1,\qquad g(x)=2x`}
          fallback="f(x)=x+1, g(x)=2x"
          className="math-tex"
        />
      </div>
      <div className="composition-notation">
        <MathTex
          tex={correct ? String.raw`g\circ f` : String.raw`f\circ g`}
          fallback={correct ? 'g ∘ f' : 'f ∘ g'}
          className="math-tex"
        />
        <small>notation reads from right to left</small>
      </div>
      <div className="composition-pipeline">
        <strong>1</strong>
        <i />
        {visibleOrder === 'f-g' ? (
          <>
            <span>
              <b>f</b>x + 1
            </span>
            <i />
            <span>
              <b>g</b>2x
            </span>
          </>
        ) : (
          <>
            <span>
              <b>g</b>2x
            </span>
            <i />
            <span>
              <b>f</b>x + 1
            </span>
          </>
        )}
        <i />
        <strong>{output}</strong>
      </div>
      <button
        className="swap-machines game-action"
        type="button"
        onClick={() => onChoose(visibleOrder === 'f-g' ? 'g-f' : 'f-g')}
      >
        swap machines
      </button>
      <button className="function-check game-action" type="button" onClick={onCheck}>
        send Euler
      </button>
      <div className="search-lanes" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <Agent crossing={solved} />
      <p className="scene-message">{message}</p>
    </section>
  );
}
