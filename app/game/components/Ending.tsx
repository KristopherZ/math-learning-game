import { ChapterEnding } from './ChapterEnding';

export function Ending({
  onReplay,
  onContinue,
}: {
  onReplay: () => void;
  onContinue?: () => void;
}) {
  return (
    <ChapterEnding
      className="ending-scene"
      ariaLabel="sets chapter complete"
      status="code delivered"
      description="Set operations secured."
      tex={'=\\quad\\cup\\quad\\cap\\quad\\setminus\\quad\\times'}
      fallback="=   ∪   ∩   ∖   ×"
      nextLabel={onContinue ? '0.2 →' : undefined}
      onReplay={onReplay}
      onNext={onContinue}
    />
  );
}
