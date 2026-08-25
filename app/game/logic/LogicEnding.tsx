import { ChapterEnding } from '../components/ChapterEnding';

export function LogicEnding({
  onReplay,
  onContinue,
}: {
  onReplay: () => void;
  onContinue: () => void;
}) {
  return (
    <ChapterEnding
      className="logic-ending"
      ariaLabel="logic chapter complete"
      status="dialogue decoded"
      description="Six operators. One clear way through."
      tex={String.raw`\land\;\lor\;\neg\;\Rightarrow\;\forall\;\exists`}
      fallback="∧  ∨  ¬  ⇒  ∀  ∃"
      nextLabel="0.1 →"
      onReplay={onReplay}
      onNext={onContinue}
    />
  );
}
