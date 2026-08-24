import { MathTex } from '../../MathTex';
import { cx } from '../cn';
import { ObjectMark } from './GameObjects';

export function SecurityCamera({ ready, caught }: { ready: boolean; caught: boolean }) {
  const label = caught
    ? 'the security camera catches e'
    : ready
      ? 'the security camera follows the abandoned tracker'
      : 'one security camera searching';

  return (
    <div
      className={cx('security-camera', ready && 'decoyed', caught && 'caught')}
      aria-label={label}
    >
      <span className="camera-bracket" aria-hidden="true" />
      <span className="camera-aim" aria-hidden="true">
        <span className="camera-field" />
        <span className="camera-head">
          <i />
        </span>
      </span>
      <span className="camera-status">
        {caught ? 'caught' : ready ? 'decoy found' : 'searching'}
      </span>
    </div>
  );
}

export function TrackerDecoy({ active }: { active: boolean }) {
  return (
    <div
      className={cx('tracker-decoy', active && 'active')}
      aria-label={active ? 'tracker left behind as a decoy' : 'tracker carried by e'}
    >
      <ObjectMark kind="tracker" />
      <i aria-hidden="true" />
    </div>
  );
}

export function DocumentCase({ ready }: { ready: boolean }) {
  return (
    <div
      className={cx('document-case', ready && 'packed')}
      aria-label={
        ready ? 'document-room case packed with every required item' : 'empty document-room case'
      }
    >
      <span className="document-handle" aria-hidden="true" />
      <span className="document-lid" aria-hidden="true" />
      <span className="packed-items" aria-hidden="true">
        <ObjectMark kind="key" />
        <ObjectMark kind="photo" />
        <ObjectMark kind="map" />
      </span>
      <span className="document-status">
        {ready ? (
          'all required'
        ) : (
          <MathTex tex={'A\\mathbin{\\cup}B'} fallback="A ∪ B" className="math-tex" />
        )}
      </span>
    </div>
  );
}

export function SpyContact({ ready }: { ready: boolean }) {
  return (
    <div
      className={cx('spy-contact', ready && 'exchange-ready')}
      aria-label={ready ? 'spy accepts the shared item' : 'spy waiting for the shared item'}
    >
      <span className="spy-hat" aria-hidden="true" />
      <span className="spy-head" aria-hidden="true">
        <i />
        <i />
      </span>
      <span className="spy-body" aria-hidden="true" />
      <span className="spy-hand" aria-hidden="true" />
      <span className="exchange-item" aria-hidden="true">
        <ObjectMark kind="photo" />
      </span>
      <span className="spy-status">
        {ready ? (
          'exchange'
        ) : (
          <MathTex tex={'A\\mathbin{\\cap}B'} fallback="A ∩ B" className="math-tex" />
        )}
      </span>
    </div>
  );
}
