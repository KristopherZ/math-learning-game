import { MathTex } from '../../MathTex';
import { ChapterBriefing } from '../components/ChapterBriefing';

export function LogicBriefing({ onBegin }: { onBegin: () => void }) {
  return (
    <ChapterBriefing
      className="logic-briefing"
      linesClassName="logic-briefing-lines"
      ariaLabel="Chapter 0.0 logic briefing"
    >
      <div className="logic-briefing-copy">
        <span>0.0 · logic · demo</span>
        <h1>
          EXIT
          <br />
          DIALOG
        </h1>
        <p>The archive doors have stopped answering in plain language.</p>
        <p>
          Read each claim, translate it into logic, and make the dialog agree long enough for Euler{' '}
          <em>e</em> to find a way out.
        </p>
        <button className="game-action" type="button" onClick={onBegin}>
          enter dialogue
        </button>
      </div>
      <div className="logic-briefing-panel" aria-hidden="true">
        <div>
          <small>archive voice</small>
          <MathTex tex={'p\\land q'} fallback="p ∧ q" className="math-tex" />
        </div>
        <span>?</span>
        <div>
          <small>exit voice</small>
          <MathTex tex={'\\forall d\\in D'} fallback="∀ d ∈ D" className="math-tex" />
        </div>
      </div>
    </ChapterBriefing>
  );
}
