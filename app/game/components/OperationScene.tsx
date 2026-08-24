import { conceptTex, MathTex } from '../../MathTex';
import {
  doorScenes,
  formatSet,
  unique,
  type ObjectKind,
  type WorldObject,
} from '../chapterZeroOne';
import { cx } from '../cn';
import { Agent } from './Agent';
import { kindLabel, ObjectButton, ObjectMark } from './GameObjects';
import { DocumentCase, SecurityCamera, SpyContact, TrackerDecoy } from './MissionActors';
import { SourceSet } from './SourceSet';

type OperationSceneProps = {
  stage: number;
  result: ObjectKind[];
  solved: boolean;
  caught: boolean;
  blocked: boolean;
  message: string;
  onToggle: (kind: ObjectKind) => void;
  onCheck: () => void;
};

export function OperationScene({
  stage,
  result,
  solved,
  caught,
  blocked,
  message,
  onToggle,
  onCheck,
}: OperationSceneProps) {
  const scene = doorScenes[stage - 1];
  const candidates = unique([...scene.left, ...scene.right].map((item) => item.kind));

  return (
    <section
      className={cx(
        'world-scene',
        'operation-scene',
        `operation-${scene.concept}`,
        solved && 'solved',
        caught && 'caught',
      )}
      aria-label={`${scene.concept} enemy-evasion puzzle`}
    >
      <div className="scene-number">0.1</div>
      <div className="sky-lines" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="operation-architecture" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="floor-path" aria-hidden="true" />

      <p className="scene-whisper">{scene.prompt}</p>
      <div className="operation-sources">
        <SourceSet label="A" objects={scene.left} />
        <MathTex
          tex={conceptTex[scene.concept]}
          fallback={scene.symbol}
          className={cx('world-symbol', 'math-tex', `operator-${scene.concept}`)}
        />
        <SourceSet label="B" objects={scene.right} />
      </div>

      <div className="take-tray" aria-label="things available to place in the result set">
        {candidates.map((kind) => {
          const item: WorldObject = { id: `tool-${kind}`, kind, label: kindLabel[kind] };
          return (
            <ObjectButton
              key={kind}
              item={item}
              selected={result.includes(kind)}
              onClick={() => onToggle(kind)}
              disabled={solved}
            />
          );
        })}
      </div>

      <div
        className="result-bowl"
        aria-label={`A ${scene.concept} B equals ${formatSet(result.map((kind) => kindLabel[kind]))}`}
      >
        <div className="result-equation">
          <MathTex
            tex={`A\\mathbin{${conceptTex[scene.concept]}}B=`}
            fallback={`A ${scene.symbol} B =`}
            className="set-notation result-notation math-tex"
          />
          <MathTex tex={'\\{'} fallback="{" className="set-brace math-tex" />
          <div className="result-members">
            {result.map((kind) => (
              <ObjectMark key={kind} kind={kind} />
            ))}
          </div>
          <MathTex tex={'\\}'} fallback="}" className="set-brace math-tex" />
        </div>
        {!solved && (
          <button
            type="button"
            onClick={onCheck}
            disabled={result.length === 0 || caught || blocked}
          >
            use
          </button>
        )}
      </div>

      <Agent crossing={solved} caught={caught} blocked={blocked} />
      {scene.concept === 'union' && <DocumentCase ready={solved} />}
      {scene.concept === 'intersection' && <SpyContact ready={solved} />}
      {scene.concept === 'difference' && (
        <>
          <TrackerDecoy active={solved} />
          <SecurityCamera ready={solved} caught={caught} />
        </>
      )}
      <p className="scene-message" aria-live="polite">
        {message}
      </p>
    </section>
  );
}
