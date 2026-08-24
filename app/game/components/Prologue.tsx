import { Agent } from './Agent';

export function Prologue({ onBegin }: { onBegin: () => void }) {
  return (
    <section className="world-scene prologue-scene" aria-label="Project Proof demo briefing">
      <div className="prologue-grid" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="prologue-copy">
        <span className="prologue-kicker">interactive math game · demo</span>
        <h1>PROJECT: PROOF</h1>
        <p>A coded transmission has surfaced in the archive.</p>
        <p>
          Guide Euler <em>e</em> through the mission. Math is the tool; every choice changes the
          escape.
        </p>
        <button className="game-action" type="button" onClick={onBegin}>
          begin demo
        </button>
      </div>
      <div className="briefing-route" aria-hidden="true">
        <span>message</span>
        <i />
        <span>archive</span>
        <i />
        <span>exchange</span>
        <i />
        <span>escape</span>
      </div>
      <Agent />
    </section>
  );
}
