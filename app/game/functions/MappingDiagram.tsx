import type { InverseCase } from '../chapterZeroTwo';

const itemY = (index: number, count: number) => 55 + (index * 105) / Math.max(1, count - 1);

export function MappingDiagram({ mapping }: { mapping: InverseCase }) {
  const reached = new Set(mapping.arrows.map(([, target]) => target));
  return (
    <svg
      className="mapping-diagram"
      viewBox="0 0 360 190"
      role="img"
      aria-label={`mapping from domain ${mapping.domain.join(', ')} to codomain ${mapping.codomain.join(', ')}`}
    >
      <defs>
        <marker
          id="mapping-arrow"
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
      <text className="mapping-title" x="72" y="20">
        domain
      </text>
      <text className="mapping-title" x="288" y="20">
        codomain
      </text>
      {mapping.arrows.map(([source, target], index) => {
        const sourceIndex = mapping.domain.indexOf(source);
        const targetIndex = mapping.codomain.indexOf(target);
        return (
          <path
            key={`${source}-${target}-${index}`}
            className="mapping-arrow"
            d={`M92 ${itemY(sourceIndex, mapping.domain.length)} C155 ${itemY(sourceIndex, mapping.domain.length)},205 ${itemY(targetIndex, mapping.codomain.length)},268 ${itemY(targetIndex, mapping.codomain.length)}`}
            markerEnd="url(#mapping-arrow)"
          />
        );
      })}
      {mapping.domain.map((value, index) => (
        <g className="mapping-node domain-node" key={value}>
          <circle cx="72" cy={itemY(index, mapping.domain.length)} r="18" />
          <text x="72" y={itemY(index, mapping.domain.length) + 4}>
            {value}
          </text>
        </g>
      ))}
      {mapping.codomain.map((value, index) => (
        <g
          className={`mapping-node codomain-node ${reached.has(value) ? 'reached' : ''}`}
          key={value}
        >
          <circle cx="288" cy={itemY(index, mapping.codomain.length)} r="18" />
          <text x="288" y={itemY(index, mapping.codomain.length) + 4}>
            {value}
          </text>
        </g>
      ))}
    </svg>
  );
}
