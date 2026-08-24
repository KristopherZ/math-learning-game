import type { GraphPoint } from '../chapterZeroTwo';

type FunctionGraphProps = {
  points: GraphPoint[];
  onPointChange?: (point: GraphPoint, nextY: number) => void;
  ariaLabel: string;
};

const width = 520;
const height = 270;
const left = 44;
const right = 18;
const top = 18;
const bottom = 38;
const xValues = [-2, -1, 0, 1, 2];
const yValues = [0, 1, 2, 3, 4];

const graphX = (x: number) => left + ((x + 2) / 4) * (width - left - right);
const graphY = (y: number) => height - bottom - (y / 4) * (height - top - bottom);

export function FunctionGraph({ points, onPointChange, ariaLabel }: FunctionGraphProps) {
  function valueFromPointer(event: React.PointerEvent<SVGGElement>) {
    const svg = event.currentTarget.ownerSVGElement;
    if (!svg) return 0;
    const bounds = svg.getBoundingClientRect();
    const viewY = ((event.clientY - bounds.top) / bounds.height) * height;
    const value = ((height - bottom - viewY) / (height - top - bottom)) * 4;
    return Math.max(0, Math.min(4, Math.round(value)));
  }

  return (
    <svg className="function-graph" viewBox={`0 0 ${width} ${height}`} aria-label={ariaLabel}>
      <g className="graph-grid" aria-hidden="true">
        {xValues.map((x) => (
          <line key={`x-${x}`} x1={graphX(x)} y1={top} x2={graphX(x)} y2={height - bottom} />
        ))}
        {yValues.map((y) => (
          <line key={`y-${y}`} x1={left} y1={graphY(y)} x2={width - right} y2={graphY(y)} />
        ))}
      </g>
      <g className="graph-axes" aria-hidden="true">
        <line x1={left} y1={graphY(0)} x2={width - right} y2={graphY(0)} />
        <line x1={graphX(0)} y1={top} x2={graphX(0)} y2={height - bottom} />
        {xValues.map((x) => (
          <text key={`xt-${x}`} x={graphX(x)} y={height - 13}>
            {x}
          </text>
        ))}
        {yValues.slice(1).map((y) => (
          <text key={`yt-${y}`} x={left - 15} y={graphY(y) + 4}>
            {y}
          </text>
        ))}
      </g>
      <g className="graph-points">
        {points.map((point) => {
          const interactive = Boolean(onPointChange);
          return (
            <g
              key={point.id}
              className={`graph-point active ${interactive ? 'interactive' : ''}`}
              role={interactive ? 'button' : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={
                interactive ? `drag point at input ${point.x}, output ${point.y}` : undefined
              }
              onPointerDown={(event) => {
                if (!onPointChange) return;
                event.currentTarget.setPointerCapture(event.pointerId);
                onPointChange(point, valueFromPointer(event));
              }}
              onPointerMove={(event) => {
                if (!onPointChange || !event.currentTarget.hasPointerCapture(event.pointerId))
                  return;
                onPointChange(point, valueFromPointer(event));
              }}
              onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  event.currentTarget.releasePointerCapture(event.pointerId);
                }
              }}
              onKeyDown={(event) => {
                if (onPointChange && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
                  event.preventDefault();
                  onPointChange(
                    point,
                    Math.max(0, Math.min(4, point.y + (event.key === 'ArrowUp' ? 1 : -1))),
                  );
                  return;
                }
              }}
            >
              <circle cx={graphX(point.x)} cy={graphY(point.y)} r="8" />
              {interactive && (
                <text x={graphX(point.x) + 11} y={graphY(point.y) - 10}>
                  {point.y}
                </text>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
