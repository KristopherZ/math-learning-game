import { MathTex } from '../../MathTex';
import { formatNumberSet, rangeOf, squareCodomain, squareDomain } from '../chapterZeroTwo';
import { Agent } from '../components/Agent';
import { FunctionGraph } from './FunctionGraph';

export function GraphScene({
  values,
  solved,
  message,
  onChange,
  onCheck,
}: {
  values: Record<number, number>;
  solved: boolean;
  message: string;
  onChange: (x: number, y: number) => void;
  onCheck: () => void;
}) {
  const points = squareDomain.map((x) => ({ id: `square-${x}`, x, y: values[x] }));
  const range = rangeOf(squareDomain.map((x) => values[x]));
  return (
    <section
      className={`world-scene function-scene graph-scene ${solved ? 'solved' : ''}`}
      aria-label="formula table and graph relay"
    >
      <div className="scene-number">0.2</div>
      <p className="scene-whisper">
        forge the clearance signature: drag the corrupted points until the patrol plotter matches
        the stolen formula
      </p>
      <div className="function-header">
        <MathTex tex={String.raw`q\colon x\mapsto x^2`} fallback="q: x ↦ x²" className="math-tex" />
      </div>
      <div className="function-legend graph-legend">
        <span>
          <small>domain</small>
          {formatNumberSet(squareDomain)}
        </span>
        <span>
          <small>codomain</small>
          {formatNumberSet(squareCodomain)}
        </span>
        <span>
          <small>current range</small>
          {formatNumberSet(range)}
        </span>
      </div>
      <div className="graph-table" aria-label="current function table">
        {squareDomain.map((x) => (
          <span key={x}>
            <b>{x}</b>
            <i>↦</i>
            <strong>{values[x]}</strong>
          </span>
        ))}
      </div>
      <div className="graph-frame">
        <FunctionGraph
          points={points}
          onPointChange={(point, y) => onChange(point.x, y)}
          ariaLabel="editable graph of q"
        />
      </div>
      <button className="function-check game-action" type="button" onClick={onCheck}>
        align records
      </button>
      <Agent crossing={solved} />
      <p className="scene-message">{message}</p>
    </section>
  );
}
