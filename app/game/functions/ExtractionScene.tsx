import { MathTex } from '../../MathTex';
import { cx } from '../cn';
import { Agent } from '../components/Agent';
import type { CompositionOrder } from '../hooks/useFunctionProgress';

export function ExtractionScene({
  restricted,
  order,
  solved,
  message,
  onRestrict,
  onChooseOrder,
  onCheck,
}: {
  restricted: boolean;
  order: CompositionOrder | null;
  solved: boolean;
  message: string;
  onRestrict: (restricted: boolean) => void;
  onChooseOrder: (order: CompositionOrder) => void;
  onCheck: () => void;
}) {
  const visibleOrder = order ?? 'g-f';
  const correctOrder = visibleOrder === 'f-g';
  const output = correctOrder ? 5 : 9;
  return (
    <section
      className={cx('world-scene', 'function-scene', 'extraction-scene', solved && 'solved')}
      aria-label="reversible function extraction"
    >
      <div className="scene-number">0.2</div>
      <p className="scene-whisper">
        send 2 to 5 through a reversible route, then prove the route can return
      </p>
      <div className="function-header">
        <MathTex
          tex={String.raw`q(x)=x^2,\qquad s(x)=x+1`}
          fallback="q(x)=x², s(x)=x+1"
          className="math-tex"
        />
      </div>
      <div className="domain-shutter">
        <small>domain</small>
        <button
          type="button"
          className={cx(!restricted && 'selected')}
          onClick={() => onRestrict(false)}
        >
          {'{ −3, −2, −1, 0, 1, 2, 3 }'}
        </button>
        <button
          type="button"
          className={cx(restricted && 'selected')}
          onClick={() => onRestrict(true)}
        >
          {'{ 0, 1, 2, 3 }'}
        </button>
        <span>codomain {`{ 0, 1, 4, 9 }`}</span>
      </div>
      <div className="extraction-pipeline">
        <strong>2</strong>
        <i />
        {visibleOrder === 'f-g' ? (
          <>
            <span>
              <b>q</b>x²
            </span>
            <i />
            <span>
              <b>s</b>x + 1
            </span>
          </>
        ) : (
          <>
            <span>
              <b>s</b>x + 1
            </span>
            <i />
            <span>
              <b>q</b>x²
            </span>
          </>
        )}
        <i />
        <strong>{output}</strong>
      </div>
      <button
        className="swap-machines"
        type="button"
        onClick={() => onChooseOrder(visibleOrder === 'f-g' ? 'g-f' : 'f-g')}
      >
        swap machines
      </button>
      <div className="inverse-proof">
        <small>return check</small>
        <MathTex
          tex={
            restricted
              ? correctOrder
                ? String.raw`5\mapsto4\mapsto2`
                : String.raw`9\mapsto3\mapsto2`
              : String.raw`?\mapsto?\mapsto2`
          }
          fallback={restricted ? (correctOrder ? '5 ↦ 4 ↦ 2' : '9 ↦ 3 ↦ 2') : '? ↦ ? ↦ 2'}
          className="math-tex"
        />
      </div>
      <button className="function-check" type="button" onClick={onCheck}>
        extract
      </button>
      <Agent crossing={solved} />
      <p className="scene-message">{message}</p>
    </section>
  );
}
