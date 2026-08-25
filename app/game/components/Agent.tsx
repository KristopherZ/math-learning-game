import { cx } from '../cn';

type AgentProps = {
  crossing?: boolean;
  caught?: boolean;
  blocked?: boolean;
  exitDirection?: 'left' | 'right';
};

export function Agent({
  crossing = false,
  caught = false,
  blocked = false,
  exitDirection = 'right',
}: AgentProps) {
  return (
    <div
      className={cx(
        'minimal-agent',
        crossing && 'crossing',
        crossing && `exit-${exitDirection}`,
        caught && 'caught',
        blocked && 'blocked',
      )}
      role="img"
      aria-label="Euler e, the main character, wearing a cowboy hat"
    >
      <span className="e-hat" aria-hidden="true" />
      <span className={cx('e-arm', 'e-arm-left')} aria-hidden="true" />
      <span className={cx('e-arm', 'e-arm-right')} aria-hidden="true" />
      <span className="e-glyph" aria-hidden="true">
        e
        <span className="e-eyes">
          <i />
          <i />
        </span>
      </span>
      <span className={cx('e-leg', 'e-leg-left')} aria-hidden="true" />
      <span className={cx('e-leg', 'e-leg-right')} aria-hidden="true" />
      <span className="e-coat" aria-hidden="true" />
      <span className="e-briefcase" aria-hidden="true" />
    </div>
  );
}
