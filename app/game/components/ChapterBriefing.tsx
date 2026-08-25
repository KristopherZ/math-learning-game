import type { ReactNode } from 'react';

import { cx } from '../cn';
import { Agent } from './Agent';

type ChapterBriefingProps = {
  ariaLabel: string;
  className: string;
  linesClassName: string;
  children: ReactNode;
};

/** Shared opening-page frame for each chapter's story, artwork, and entry action. */
export function ChapterBriefing({
  ariaLabel,
  className,
  linesClassName,
  children,
}: ChapterBriefingProps) {
  return (
    <section className={cx('world-scene', 'chapter-briefing', className)} aria-label={ariaLabel}>
      <div className={linesClassName} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      {children}
      <Agent />
    </section>
  );
}
