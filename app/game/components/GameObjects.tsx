import type { ObjectKind, WorldObject } from '../chapterZeroOne';
import { cx } from '../cn';

export const kindLabel: Record<ObjectKind, string> = {
  key: 'key',
  photo: 'ID card',
  map: 'map',
  seal: 'seal',
  ticket: 'ticket',
  tracker: 'tracker',
};

export function ObjectMark({ kind }: { kind: ObjectKind }) {
  return <span className={cx('object-mark', `mark-${kind}`)} aria-hidden="true" />;
}

type ObjectButtonProps = {
  item: WorldObject;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export function ObjectButton({ item, selected, onClick, disabled = false }: ObjectButtonProps) {
  return (
    <button
      className={cx('world-object', selected && 'selected')}
      type="button"
      aria-pressed={selected}
      aria-label={`${selected ? 'Remove' : 'Take'} ${item.label}`}
      onClick={onClick}
      disabled={disabled}
    >
      <ObjectMark kind={item.kind} />
      <span>{item.label}</span>
    </button>
  );
}
