import { Agent } from '../components/Agent';

export function FunctionBriefing({ onBegin, onBack }: { onBegin: () => void; onBack: () => void }) {
  return (
    <section className="world-scene function-briefing" aria-label="Chapter 0.2 functions briefing">
      <div className="function-briefing-lines" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="function-briefing-copy">
        <span>0.2 · functions &amp; relations · demo</span>
        <h1>
          RELAY
          <br />
          LOGIC
        </h1>
        <p>The recovered code points to a machine network under surveillance.</p>
        <p>
          Make every input travel deliberately. If one signal splits, the search grid finds Euler.
        </p>
        <button className="game-action" type="button" onClick={onBegin}>
          enter relay
        </button>
        <button className="briefing-back game-action" type="button" onClick={onBack}>
          ← 0.1
        </button>
      </div>
      <div className="briefing-machine" aria-hidden="true">
        <i>f</i>
        <span>input</span>
        <b>output</b>
      </div>
      <Agent />
    </section>
  );
}
