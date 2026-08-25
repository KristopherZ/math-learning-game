import { MathTex } from '../../MathTex';
import { logicConceptNotes, type LogicConceptKey } from '../chapterZeroZero';

export function LogicConceptNote({
  concept,
  onClose,
}: {
  concept: LogicConceptKey;
  onClose: () => void;
}) {
  const note = logicConceptNotes[concept];
  return (
    <div className="note-shade">
      <section
        className="tiny-note logic-note"
        role="dialog"
        aria-modal="true"
        aria-label={`${concept} concept note`}
      >
        <strong>{note.symbol}</strong>
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
