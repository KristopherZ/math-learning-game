import { MathTex } from '../../MathTex';
import { Agent } from '../components/Agent';

export function LogicEnding({
  onReplay,
  onContinue,
}: {
  onReplay: () => void;
  onContinue: () => void;
}) {
  return (
    <section className="world-scene logic-ending" aria-label="logic chapter complete">
      <div className="logic-ending-mark" aria-hidden="true">
        <MathTex
          tex={'\\land\\;\\lor\\;\\neg\\;\\Rightarrow\\;\\forall\\;\\exists'}
          fallback="∧  ∨  ¬  ⇒  ∀  ∃"
        />
      </div>
      <Agent crossing />
      <p>dialogue decoded</p>
      <span>Six ways to make a claim. One way through.</span>
      <div className="ending-actions">
        <button className="game-action" type="button" onClick={onReplay}>
          ↻
        </button>
        <button className="game-action" type="button" onClick={onContinue}>
          0.1 →
        </button>
      </div>
    </section>
  );
}
