import { relationPoints, squareCodomain, squareDomain } from '../chapterZeroTwo';
import { cx } from '../cn';

const width = 620;
const height = 270;
const sourceX = 115;
const targetX = 505;
const nodeY = (index: number) => 50 + index * 43;
const curvePoint = (start: number, controlA: number, controlB: number, end: number, t: number) =>
  (1 - t) ** 3 * start +
  3 * (1 - t) ** 2 * t * controlA +
  3 * (1 - t) * t ** 2 * controlB +
  t ** 3 * end;

export function RelationManifest({
  selected,
  onToggle,
}: {
  selected: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <svg
      className="relation-manifest"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="damaged relay mapping from input ports in the domain to output channels in the codomain"
    >
      <defs>
        <marker
          id="manifest-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 10 5 0 10Z" />
        </marker>
      </defs>

      <text className="manifest-title" x={sourceX} y="18">
        input ports · domain
      </text>
      <text className="manifest-title" x={targetX} y="18">
        output channels · codomain
      </text>

      <g className="manifest-routes">
        {relationPoints.map((point) => {
          const active = selected.has(point.id);
          const sourceY = nodeY(squareDomain.indexOf(point.x));
          const targetY = nodeY(squareCodomain.indexOf(point.y));
          const routeStart = sourceX + 18;
          const routeEnd = targetX - 22;
          const route = `M${routeStart} ${sourceY} C240 ${sourceY},380 ${targetY},${routeEnd} ${targetY}`;
          const switchT = 0.28;
          const switchX = curvePoint(routeStart, 240, 380, routeEnd, switchT);
          const switchY = curvePoint(sourceY, sourceY, targetY, targetY, switchT);
          return (
            <g key={point.id} className={cx('manifest-route', active && 'active')}>
              <path className="manifest-route-line" d={route} markerEnd="url(#manifest-arrow)" />
              <circle
                className="manifest-route-switch"
                cx={switchX}
                cy={switchY}
                r="5"
                role="button"
                tabIndex={0}
                aria-pressed={active}
                aria-label={`${active ? 'cut' : 'restore'} route from input ${point.x} to output ${point.y}`}
                onClick={() => onToggle(point.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onToggle(point.id);
                  }
                }}
              />
            </g>
          );
        })}
      </g>

      {squareDomain.map((value, index) => (
        <g className="manifest-node codename-node" key={`domain-${value}`}>
          <circle cx={sourceX} cy={nodeY(index)} r="18" />
          <text x={sourceX} y={nodeY(index) + 4}>
            {value}
          </text>
        </g>
      ))}
      {squareCodomain.map((value, index) => (
        <g className="manifest-node safehouse-node" key={`codomain-${value}`}>
          <rect x={targetX - 21} y={nodeY(index) - 15} width="42" height="30" />
          <text x={targetX} y={nodeY(index) + 4}>
            {value}
          </text>
        </g>
      ))}

      <text className="manifest-hint" x={width / 2} y="264">
        each input port needs one active route
      </text>
    </svg>
  );
}
