import { MathTex } from '../../MathTex';
import type { WorldObject } from '../chapterZeroOne';
import { cx } from '../cn';
import { ObjectMark } from './GameObjects';

export function SourceSet({ label, objects }: { label: string; objects: WorldObject[] }) {
  return (
    <div
      className={cx('source-set', `source-${label.toLowerCase()}`)}
      aria-label={`set ${label}: ${objects.map((item) => item.label).join(', ')}`}
    >
      <MathTex tex={`${label}=\\{`} fallback={`${label} = {`} className="set-notation math-tex" />
      <div>
        {objects.map((item) => (
          <ObjectMark key={item.id} kind={item.kind} />
        ))}
      </div>
      <MathTex tex={'\\}'} fallback="}" className="set-notation math-tex" />
    </div>
  );
}
