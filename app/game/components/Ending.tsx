import { MathTex } from '../../MathTex';
import { Agent } from './Agent';

export function Ending({ onReplay }: { onReplay: () => void }) {
  return (
    <section className="world-scene ending-scene" aria-label="chapter complete">
      <div className="ending-rings" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <Agent />
      <div className="ending-path" aria-hidden="true" />
      <p>code delivered</p>
      <span>
        <MathTex
          tex={'=\\quad\\cup\\quad\\cap\\quad\\setminus\\quad\\times'}
          fallback="=   ∪   ∩   ∖   ×"
          className="math-tex"
        />
      </span>
      <button type="button" onClick={onReplay}>
        ↻
      </button>
    </section>
  );
}
