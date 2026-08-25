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
        <p>The archive doors now answer only in logic.</p>
        <p>
          Read each door status, change one sentence at a time, and make the dialog reveal an
          unlocked route for Euler <em>e</em>.
        </p>
        <button className="game-action" type="button" onClick={onBegin}>
          enter dialogue
        </button>
      </div>
      <div className="logic-briefing-panel" aria-hidden="true">
        <div>
          <small>door status</small>
          <MathTex
            tex={String.raw`\text{door is locked}`}
            fallback="door is locked"
            className="math-tex"
          />
        </div>
        <span>?</span>
        <div>
          <small>e&apos;s instruction</small>
          <MathTex
            tex={String.raw`\neg(\text{door is locked})`}
            fallback="¬(door is locked)"
            className="math-tex"
          />
        </div>
      </div>
    </ChapterBriefing>
  );
}
