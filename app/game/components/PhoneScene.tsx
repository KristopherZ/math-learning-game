import { MathTex } from '../../MathTex';
import { archiveObjects, doorNeed, equalSets, formatSet, unique } from '../chapterZeroOne';
import { Agent } from './Agent';
import { kindLabel, ObjectButton, ObjectMark } from './GameObjects';

type PhoneSceneProps = {
  selected: string[];
  message: string;
  onToggle: (id: string) => void;
  onRead: () => void;
};

export function PhoneScene({ selected, message, onToggle, onRead }: PhoneSceneProps) {
  const chosen = archiveObjects.filter((item) => selected.includes(item.id));
  const chosenKinds = chosen.map((item) => item.kind);
  const unlocked = equalSets(chosenKinds, doorNeed);
  const duplicate = chosenKinds.length !== unique(chosenKinds).length;

  return (
    <section
      className={`world-scene phone-scene ${unlocked ? 'unlocked' : ''}`}
      aria-label="encrypted field phone"
    >
      <div className="scene-number">0.1</div>
      <p className="scene-whisper">take the key and ID card required by the phone</p>
      <div className="phone-items" aria-label="objects available for phone authentication">
        {archiveObjects.map((item) => (
          <ObjectButton
            key={item.id}
            item={item}
            selected={selected.includes(item.id)}
            onClick={() => onToggle(item.id)}
          />
        ))}
      </div>
      <div className="field-phone">
        <span className="phone-speaker" aria-hidden="true" />
        <div className="phone-screen" aria-live="polite">
          <div
            className="phone-set target-set"
            aria-label="required set D contains a key and ID card"
          >
            <MathTex tex={'D=\\{'} fallback="D = {" className="math-tex" />
            <ObjectMark kind="key" />
            <ObjectMark kind="photo" />
            <MathTex tex={'\\}'} fallback="}" className="math-tex" />
          </div>
          <div
            className="phone-set chosen-set"
            aria-label={`selected set S ${formatSet(unique(chosenKinds).map((kind) => kindLabel[kind]))}`}
          >
            <MathTex tex={'S=\\{'} fallback="S = {" className="math-tex" />
            {chosen.map((item) => (
              <ObjectMark key={item.id} kind={item.kind} />
            ))}
            <MathTex tex={'\\}'} fallback="}" className="math-tex" />
          </div>
          {duplicate && <small>repeat ignored</small>}
          {unlocked && (
            <>
              <b>message received</b>
              <small>take everything named in either document</small>
            </>
          )}
        </div>
        {unlocked && (
          <button className="read-message" type="button" onClick={onRead}>
            continue
          </button>
        )}
      </div>
      <Agent />
      <p className="scene-message" aria-live="polite">
        {message}
      </p>
    </section>
  );
}
