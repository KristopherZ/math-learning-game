import { ChapterBriefing } from '../components/ChapterBriefing';

export function FunctionBriefing({ onBegin }: { onBegin: () => void }) {
  return (
    <ChapterBriefing
      className="function-briefing"
      linesClassName="function-briefing-lines"
      ariaLabel="Chapter 0.2 functions briefing"
    >
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
      </div>
      <div className="briefing-machine" aria-hidden="true">
        <i>f</i>
        <span>input</span>
        <b>output</b>
      </div>
    </ChapterBriefing>
  );
}
