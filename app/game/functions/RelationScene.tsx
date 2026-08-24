import {
  formatNumberSet,
  rangeOf,
  relationPoints,
  squareCodomain,
  squareDomain,
} from '../chapterZeroTwo';
import { Agent } from '../components/Agent';
import { RelationManifest } from './RelationManifest';

export function RelationScene({
  selected,
  solved,
  message,
  onToggle,
  onCheck,
}: {
  selected: Set<string>;
  solved: boolean;
  message: string;
  onToggle: (id: string) => void;
  onCheck: () => void;
}) {
  const range = rangeOf(
    relationPoints.filter((point) => selected.has(point.id)).map((point) => point.y),
  );
  return (
    <section
      className={`world-scene function-scene relation-scene ${solved ? 'solved' : ''}`}
      aria-label="damaged relay network"
    >
      <div className="scene-number">0.2</div>
      <p className="scene-whisper">
        the relay cannot choose a destination: cut the duplicate route so every input has exactly
        one output
      </p>
      <div className="function-legend relation-legend">
        <span>
          <small>domain A</small>
          {formatNumberSet(squareDomain)}
        </span>
        <span>
          <small>codomain B</small>
          {formatNumberSet(squareCodomain)}
        </span>
        <span>
          <small>range</small>
          {formatNumberSet(range)}
        </span>
      </div>
      <div className="manifest-frame">
        <RelationManifest selected={selected} onToggle={onToggle} />
      </div>
      <button className="function-check" type="button" onClick={onCheck}>
        test relay
      </button>
      <Agent crossing={solved} />
      <p className="scene-message">{message}</p>
    </section>
  );
}
