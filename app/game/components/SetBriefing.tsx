import { MathTex } from '../../MathTex';
import { ChapterBriefing } from './ChapterBriefing';

export function SetBriefing({ onBegin }: { onBegin: () => void }) {
  return (
    <ChapterBriefing
      className="set-briefing"
      linesClassName="set-briefing-lines"
      ariaLabel="Chapter 0.1 sets briefing"
    >
      <div className="set-briefing-copy">
        <span>0.1 · sets · demo</span>
        <h1>
          ARCHIVE
          <br />
          PROTOCOL
        </h1>
        <p>The first transmission is sealed inside the document room.</p>
        <p>
          Match what belongs together, then use union, intersection, difference, and product to move
          Euler <em>e</em> through the archive.
        </p>
        <button className="game-action" type="button" onClick={onBegin}>
          enter archive
        </button>
      </div>
      <div className="set-briefing-panel" aria-hidden="true">
        <div className="set-card set-card-a">
          <small>document A</small>
          <MathTex tex={'A=\\{\\text{key},\\text{id}\\}'} fallback="A = { key, id }" />
        </div>
        <MathTex tex={'\\cup'} fallback="∪" className="set-briefing-operator" />
        <div className="set-card set-card-b">
          <small>document B</small>
          <MathTex tex={'B=\\{\\text{id},\\text{map}\\}'} fallback="B = { id, map }" />
        </div>
        <div className="set-briefing-result">
          <small>carry the right set</small>
          <MathTex tex={'\\{\\text{key},\\text{id},\\text{map}\\}'} fallback="{ key, id, map }" />
        </div>
      </div>
    </ChapterBriefing>
  );
}
