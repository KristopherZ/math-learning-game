import { MathTex } from '../../MathTex';
import { functionConcepts, type FunctionConceptKey } from '../chapterZeroTwo';

export function FunctionConceptNote({
  concept,
  onClose,
}: {
  concept: FunctionConceptKey;
  onClose: () => void;
}) {
  const note = functionConcepts[concept];
  return (
    <div className="note-shade function-note-shade">
      <section
        className="tiny-note function-note"
        role="dialog"
        aria-modal="true"
        aria-label={`${concept} concept note`}
      >
        <strong>
          <MathTex tex={note.texSymbol} fallback={note.symbol} className="math-tex" />
        </strong>
        <p>{note.line}</p>
        <code>
          <MathTex tex={note.texExample} fallback={note.example} className="math-tex" />
        </code>
        <button className="game-action" type="button" onClick={onClose} autoFocus>
          continue
        </button>
      </section>
    </div>
  );
}
