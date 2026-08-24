import { MathTex } from '../../MathTex';
import { copyFiles, copySlots } from '../chapterZeroOne';
import { cx } from '../cn';
import { Agent } from './Agent';
import { ObjectMark } from './GameObjects';

type CartesianSceneProps = {
  selected: string[];
  solved: boolean;
  message: string;
  onToggle: (pair: string) => void;
  onCheck: () => void;
};

export function CartesianScene({
  selected,
  solved,
  message,
  onToggle,
  onCheck,
}: CartesianSceneProps) {
  return (
    <section
      className={cx('world-scene', 'cartesian-scene', solved && 'solved')}
      aria-label="Cartesian product archive-copy puzzle"
    >
      <div className="scene-number">0.1</div>
      <p className="scene-whisper">copy every stolen file into every safe archive slot</p>

      <div className="copy-equation" aria-label="files Cartesian product archive slots">
        <MathTex tex={'F=\\{'} fallback="F = {" className="math-tex" />
        <span className="copy-source">
          <ObjectMark kind="photo" />
          <ObjectMark kind="map" />
        </span>
        <MathTex tex={'\\}'} fallback="}" className="math-tex" />
        <MathTex tex={'\\times'} fallback="×" className="math-tex copy-operator" />
        <MathTex tex={'C=\\{\\alpha,\\beta\\}'} fallback="C = { α, β }" className="math-tex" />
      </div>

      <div className="copy-matrix" aria-label="ordered file and archive-slot pairs">
        <span className="matrix-corner">
          <MathTex tex={'F\\mathbin{\\times}C'} fallback="F × C" className="math-tex" />
        </span>
        {copySlots.map((slot) => (
          <span key={slot.id} className="matrix-slot">
            <MathTex
              tex={slot.id === 'alpha' ? '\\alpha' : '\\beta'}
              fallback={slot.label}
              className="math-tex"
            />
          </span>
        ))}
        {copyFiles.map((file) => (
          <div className="matrix-row" key={file.id}>
            <span className="matrix-file">
              <ObjectMark kind={file.id === 'id' ? 'photo' : 'map'} />
              {file.label}
            </span>
            {copySlots.map((slot) => {
              const pair = `${file.id}:${slot.id}`;
              const active = selected.includes(pair);
              return (
                <button
                  type="button"
                  key={pair}
                  className={cx('copy-pair', active && 'selected')}
                  aria-pressed={active}
                  aria-label={`${active ? 'Remove' : 'Copy'} ${file.label} to archive slot ${slot.label}`}
                  disabled={solved}
                  onClick={() => onToggle(pair)}
                >
                  <span>(</span>
                  <ObjectMark kind={file.id === 'id' ? 'photo' : 'map'} />
                  <span>, {slot.label})</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className={cx('copy-status', solved && 'complete')} aria-live="polite">
        <span>{solved ? '4 copies complete' : `${selected.length} / 4 paired`}</span>
        {!solved && (
          <button type="button" onClick={onCheck} disabled={selected.length === 0}>
            copy
          </button>
        )}
      </div>

      <Agent crossing={solved} />
      <p className="scene-message" aria-live="polite">
        {message}
      </p>
    </section>
  );
}
