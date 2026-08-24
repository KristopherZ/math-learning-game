import { conceptTex, MathTex } from '../../MathTex';
import { conceptNotes, type ConceptKey } from '../chapterZeroOne';

export function ConceptNote({ concept, onClose }: { concept: ConceptKey; onClose: () => void }) {
  const note = conceptNotes[concept];
  return (
    <div className="note-shade">
      <section
        className="tiny-note"
        role="dialog"
        aria-modal="true"
        aria-label={`${concept} concept note`}
      >
        <strong>
          <MathTex tex={conceptTex[concept]} fallback={note.symbol} className="math-tex" />
        </strong>
        <p>{note.line}</p>
        <code>
          <MathTex tex={note.texExample} fallback={note.example} className="math-tex" />
        </code>
        <button type="button" onClick={onClose} autoFocus>
          continue
        </button>
      </section>
    </div>
  );
}
