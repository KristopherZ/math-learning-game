import { MathTex } from '../../MathTex';
import { Agent } from '../components/Agent';

export function FunctionEnding({ onReplay, onBack }: { onReplay: () => void; onBack: () => void }) {
  return (
    <section className="world-scene function-ending" aria-label="Chapter 0.2 complete">
      <div className="function-ending-lines" aria-hidden="true">
        <i />
        <i />
      </div>
      <Agent />
      <p>relay escaped</p>
      <MathTex
        tex={String.raw`A\xrightarrow{f}B\xrightarrow{g}C`}
        fallback="A → B → C"
        className="math-tex"
      />
      <div className="function-ending-actions">
        <button type="button" onClick={onReplay}>
          ↻
        </button>
        <button type="button" onClick={onBack}>
          ← 0.1
        </button>
      </div>
    </section>
  );
}
