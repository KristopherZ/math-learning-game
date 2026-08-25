import { ChapterEnding } from '../components/ChapterEnding';

export function FunctionEnding({ onReplay, onBack }: { onReplay: () => void; onBack: () => void }) {
  return (
    <ChapterEnding
      className="function-ending"
      ariaLabel="functions chapter complete"
      status="relay escaped"
      description="The route composes cleanly."
      tex={String.raw`A\xrightarrow{f}B\xrightarrow{g}C`}
      fallback="A → B → C"
      nextLabel="← 0.1"
      onReplay={onReplay}
      onNext={onBack}
    />
  );
}
