import { MathTex } from '../../MathTex';
import { cx } from '../cn';
import { Agent } from './Agent';

type ChapterEndingProps = {
  ariaLabel: string;
  status: string;
  description: string;
  tex: string;
  fallback: string;
  replayLabel?: string;
  nextLabel?: string;
  onReplay: () => void;
  onNext?: () => void;
  className?: string;
};

export function ChapterEnding({
  ariaLabel,
  status,
  description,
  tex,
  fallback,
  replayLabel = '↻',
  nextLabel,
  onReplay,
  onNext,
  className,
}: ChapterEndingProps) {
  return (
    <section className={cx('world-scene', 'chapter-ending', className)} aria-label={ariaLabel}>
      <div className="chapter-ending-rings ending-rings" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="chapter-ending-mark" aria-hidden="true">
        <MathTex tex={tex} fallback={fallback} className="math-tex" />
      </div>
      <Agent />
      <p className="chapter-ending-status">{status}</p>
      <span className="chapter-ending-description">{description}</span>
      <div className="chapter-ending-actions">
        <button className="game-action" type="button" onClick={onReplay}>
          {replayLabel}
        </button>
        {onNext && nextLabel && (
          <button className="game-action" type="button" onClick={onNext}>
            {nextLabel}
          </button>
        )}
      </div>
    </section>
  );
}
