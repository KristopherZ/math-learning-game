'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  archiveObjects,
  conceptNotes,
  doorNeed,
  doorScenes,
  equalSets,
  formatSet,
  unique,
  type ConceptKey,
  type ObjectKind,
  type WorldObject,
} from './game/chapterZeroOne';

const SEEN_KEY = 'project-proof-minimal-v1-seen-concepts';
const kindLabel: Record<ObjectKind, string> = {
  key: 'key',
  photo: 'ID card',
  map: 'map',
  seal: 'seal',
  ticket: 'ticket',
  tracker: 'tracker',
};

function ObjectMark({ kind }: { kind: ObjectKind }) {
  return <span className={`object-mark mark-${kind}`} aria-hidden="true"><i /></span>;
}

function ObjectButton({ item, selected, onClick, disabled = false }: {
  item: WorldObject;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={`world-object ${selected ? 'selected' : ''}`}
      type="button"
      aria-pressed={selected}
      aria-label={`${selected ? 'Remove' : 'Take'} ${item.label}`}
      onClick={onClick}
      disabled={disabled}
    >
      <ObjectMark kind={item.kind} />
      <span>{item.label}</span>
    </button>
  );
}

function Agent({ crossing = false, caught = false, blocked = false }: { crossing?: boolean; caught?: boolean; blocked?: boolean }) {
  return (
    <div className={`minimal-agent ${crossing ? 'crossing' : ''} ${caught ? 'caught' : ''} ${blocked ? 'blocked' : ''}`} role="img" aria-label="Euler e, the main character, wearing a cowboy hat">
      <span className="e-hat" aria-hidden="true" />
      <span className="e-arm e-arm-left" aria-hidden="true" />
      <span className="e-arm e-arm-right" aria-hidden="true" />
      <span className="e-glyph" aria-hidden="true">
        e
        <span className="e-eyes"><i /><i /></span>
      </span>
      <span className="e-leg e-leg-left" aria-hidden="true" />
      <span className="e-leg e-leg-right" aria-hidden="true" />
    </div>
  );
}

function ConceptNote({ concept, onClose }: { concept: ConceptKey; onClose: () => void }) {
  const note = conceptNotes[concept];
  return (
    <div className="note-shade">
      <section className="tiny-note" role="dialog" aria-modal="true" aria-label={`${concept} concept note`}>
        <strong>{note.symbol}</strong>
        <p>{note.line}</p>
        <code>{note.example}</code>
        <button type="button" onClick={onClose} autoFocus>continue</button>
      </section>
    </div>
  );
}

function PhoneScene({ selected, message, onToggle, onRead }: {
  selected: string[];
  message: string;
  onToggle: (id: string) => void;
  onRead: () => void;
}) {
  const chosen = archiveObjects.filter((item) => selected.includes(item.id));
  const chosenKinds = chosen.map((item) => item.kind);
  const unlocked = equalSets(chosenKinds, doorNeed);
  const duplicate = chosenKinds.length !== unique(chosenKinds).length;

  return (
    <section className={`world-scene phone-scene ${unlocked ? 'unlocked' : ''}`} aria-label="encrypted field phone">
      <div className="scene-number">0.1</div>
      <p className="scene-whisper">take the key and ID card required by the phone</p>
      <div className="phone-items" aria-label="objects available for phone authentication">
        {archiveObjects.map((item) => (
          <ObjectButton key={item.id} item={item} selected={selected.includes(item.id)} onClick={() => onToggle(item.id)} />
        ))}
      </div>
      <div className="field-phone">
        <span className="phone-speaker" aria-hidden="true" />
        <div className="phone-screen" aria-live="polite">
          <div className="phone-set target-set" aria-label="required set D contains a key and ID card">
            <span>D = {'{'}</span><ObjectMark kind="key" /><ObjectMark kind="photo" /><span>{'}'}</span>
          </div>
          <div className="phone-set chosen-set" aria-label={`selected set S ${formatSet(unique(chosenKinds).map((kind) => kindLabel[kind]))}`}>
            <span>S = {'{'}</span>{chosen.map((item) => <ObjectMark key={item.id} kind={item.kind} />)}<span>{'}'}</span>
          </div>
          {duplicate && <small>repeat ignored</small>}
          {unlocked && <><b>message received</b><small>take everything named in either document</small></>}
        </div>
        {unlocked && <button className="read-message" type="button" onClick={onRead}>continue</button>}
      </div>
      <Agent />
      <p className="scene-message" aria-live="polite">{message}</p>
    </section>
  );
}

function SecurityCamera({ ready, caught }: {
  ready: boolean;
  caught: boolean;
}) {
  return (
    <div className={`security-camera ${ready ? 'decoyed' : ''} ${caught ? 'caught' : ''}`} aria-label={caught ? 'the security camera catches e' : ready ? 'the security camera follows the abandoned tracker' : 'one security camera searching'}>
      <span className="camera-bracket" aria-hidden="true" />
      <span className="camera-aim" aria-hidden="true">
        <span className="camera-field" />
        <span className="camera-head"><i /></span>
      </span>
      <span className="camera-status">{caught ? 'caught' : ready ? 'decoy found' : 'searching'}</span>
    </div>
  );
}

function TrackerDecoy({ active }: { active: boolean }) {
  return (
    <div className={`tracker-decoy ${active ? 'active' : ''}`} aria-label={active ? 'tracker left behind as a decoy' : 'tracker carried by e'}>
      <ObjectMark kind="tracker" />
      <i aria-hidden="true" />
    </div>
  );
}

function DocumentCase({ ready }: { ready: boolean }) {
  return (
    <div className={`document-case ${ready ? 'packed' : ''}`} aria-label={ready ? 'document-room case packed with every required item' : 'empty document-room case'}>
      <span className="document-handle" aria-hidden="true" />
      <span className="document-lid" aria-hidden="true" />
      <span className="packed-items" aria-hidden="true"><ObjectMark kind="key" /><ObjectMark kind="photo" /><ObjectMark kind="map" /></span>
      <span className="document-status">{ready ? 'all required' : 'A ∪ B'}</span>
    </div>
  );
}

function SpyContact({ ready }: { ready: boolean }) {
  return (
    <div className={`spy-contact ${ready ? 'exchange-ready' : ''}`} aria-label={ready ? 'spy accepts the shared item' : 'spy waiting for the shared item'}>
      <span className="spy-hat" aria-hidden="true" />
      <span className="spy-head" aria-hidden="true"><i /><i /></span>
      <span className="spy-body" aria-hidden="true" />
      <span className="spy-hand" aria-hidden="true" />
      <span className="exchange-item" aria-hidden="true"><ObjectMark kind="photo" /></span>
      <span className="spy-status">{ready ? 'exchange' : 'A ∩ B'}</span>
    </div>
  );
}

function SourceSet({ label, objects }: { label: string; objects: WorldObject[] }) {
  return (
    <div className={`source-set source-${label.toLowerCase()}`} aria-label={`set ${label}: ${objects.map((item) => item.label).join(', ')}`}>
      <span className="set-notation">{label} = {'{'}</span>
      <div>{objects.map((item) => <ObjectMark key={item.id} kind={item.kind} />)}</div>
      <span className="set-notation">{'}'}</span>
    </div>
  );
}

function OperationScene({ stage, result, solved, caught, blocked, message, onToggle, onCheck }: {
  stage: number;
  result: ObjectKind[];
  solved: boolean;
  caught: boolean;
  blocked: boolean;
  message: string;
  onToggle: (kind: ObjectKind) => void;
  onCheck: () => void;
}) {
  const scene = doorScenes[stage - 1];
  const candidates = unique([...scene.left, ...scene.right].map((item) => item.kind));

  return (
    <section className={`world-scene operation-scene operation-${scene.concept} ${solved ? 'solved' : ''} ${caught ? 'caught' : ''}`} aria-label={`${scene.concept} enemy-evasion puzzle`}>
      <div className="scene-number">0.{stage + 1}</div>
      <div className="sky-lines" aria-hidden="true"><i /><i /><i /></div>
      <div className="operation-architecture" aria-hidden="true"><i /><i /><i /></div>
      <div className="floor-path" aria-hidden="true" />

      <p className="scene-whisper">{scene.prompt}</p>
      <div className="operation-sources">
        <SourceSet label="A" objects={scene.left} />
        <span className="world-symbol">{scene.symbol}</span>
        <SourceSet label="B" objects={scene.right} />
      </div>

      <div className="take-tray" aria-label="things available to place in the result set">
        {candidates.map((kind) => {
          const item: WorldObject = { id: `tool-${kind}`, kind, label: kindLabel[kind] };
          return <ObjectButton key={kind} item={item} selected={result.includes(kind)} onClick={() => onToggle(kind)} disabled={solved} />;
        })}
      </div>

      <div className="result-bowl" aria-label={`A ${scene.concept} B equals ${formatSet(result.map((kind) => kindLabel[kind]))}`}>
        <div className="result-equation">
          <span className="set-notation">A {scene.symbol} B = {'{'}</span>
          <div className="result-members">{result.map((kind) => <ObjectMark key={kind} kind={kind} />)}</div>
          <span className="set-notation">{'}'}</span>
        </div>
        {!solved && <button type="button" onClick={onCheck} disabled={result.length === 0 || caught || blocked}>use</button>}
      </div>

      <Agent crossing={solved} caught={caught} blocked={blocked} />
      {scene.concept === 'union' && <DocumentCase ready={solved} />}
      {scene.concept === 'intersection' && <SpyContact ready={solved} />}
      {scene.concept === 'difference' && <><TrackerDecoy active={solved} /><SecurityCamera ready={solved} caught={caught} /></>}
      <p className="scene-message" aria-live="polite">{message}</p>
    </section>
  );
}

function Ending({ onReplay }: { onReplay: () => void }) {
  return (
    <section className="world-scene ending-scene" aria-label="chapter complete">
      <div className="ending-rings" aria-hidden="true"><i /><i /><i /><i /></div>
      <Agent />
      <div className="ending-path" aria-hidden="true" />
      <p>sets secured</p>
      <span>= &nbsp; ∪ &nbsp; ∩ &nbsp; ∖</span>
      <button type="button" onClick={onReplay}>↻</button>
    </section>
  );
}

export default function ChapterZeroOne() {
  const [stage, setStage] = useState(0);
  const [selection, setSelection] = useState<string[]>([]);
  const [result, setResult] = useState<ObjectKind[]>([]);
  const [solved, setSolved] = useState(false);
  const [caught, setCaught] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [message, setMessage] = useState('');
  const [note, setNote] = useState<ConceptKey | null>(null);
  const [seen, setSeen] = useState<Set<ConceptKey>>(new Set());
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cutting, setCutting] = useState(false);

  const currentConcept: ConceptKey = stage === 0 ? 'equality' : doorScenes[Math.min(stage - 1, 2)]?.concept || 'difference';

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = new Set<ConceptKey>(JSON.parse(localStorage.getItem(SEEN_KEY) || '[]'));
      setSeen(stored);
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      if (!stored.has('equality')) setNote('equality');
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const textNodes = Array.from(document.querySelectorAll<HTMLElement>([
      '.scene-number',
      '.scene-whisper',
      '.scene-message',
      '.door-need',
      '.set-case small',
      '.world-object > span:last-child',
      '.set-notation',
      '.world-symbol',
      '.phone-screen',
      '.document-status',
      '.spy-status',
      '.camera-status',
      '.tiny-note p',
      '.tiny-note code',
      '.ending-scene > p',
      '.ending-scene > span',
    ].join(',')));
    let frame = 0;
    let pointerX = -1000;
    let pointerY = -1000;

    const paint = () => {
      textNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const dx = Math.max(rect.left - pointerX, 0, pointerX - rect.right);
        const dy = Math.max(rect.top - pointerY, 0, pointerY - rect.bottom);
        const proximity = Math.max(0, 1 - Math.hypot(dx, dy) / 170);
        node.style.setProperty('--near', proximity.toFixed(3));
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };

    const reset = () => {
      textNodes.forEach((node) => node.style.setProperty('--near', '0'));
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', reset);
    };
  }, [stage, note]);

  function closeNote() {
    if (!note) return;
    const next = new Set(seen).add(note);
    setSeen(next);
    localStorage.setItem(SEEN_KEY, JSON.stringify([...next]));
    setNote(null);
  }

  function moveTo(nextStage: number) {
    setCutting(true);
    window.setTimeout(() => {
      setStage(nextStage);
      setSelection([]);
      setResult([]);
      setSolved(false);
      setCaught(false);
      setBlocked(false);
      setMessage('');
      if (nextStage > 0 && nextStage < 4) {
        const concept = doorScenes[nextStage - 1].concept;
        if (!seen.has(concept)) setNote(concept);
      }
    }, reducedMotion ? 15 : 350);
    window.setTimeout(() => setCutting(false), reducedMotion ? 30 : 760);
  }

  function togglePhoneItem(id: string) {
    setSelection((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    setMessage('');
  }

  function toggleResult(kind: ObjectKind) {
    setResult((current) => current.includes(kind) ? current.filter((item) => item !== kind) : [...current, kind]);
    setSolved(false);
    setCaught(false);
    setBlocked(false);
    setMessage('');
  }

  function checkResult() {
    const scene = doorScenes[stage - 1];
    const correct = equalSets(result, scene.expected);
    setSolved(correct);
    if (correct) {
      setCaught(false);
      setBlocked(false);
      setMessage(scene.success);
      window.setTimeout(() => moveTo(stage + 1), reducedMotion ? 150 : 2400);
      return;
    }
    if (scene.concept === 'difference') {
      if (result.includes('tracker')) {
        setBlocked(false);
        setCaught(true);
        setMessage(`caught — ${scene.caughtHint || scene.hint}`);
        window.setTimeout(() => setCaught(false), reducedMotion ? 120 : 1350);
      } else {
        setCaught(false);
        setBlocked(true);
        setMessage(`stopped — ${scene.missingHint || scene.hint}`);
        window.setTimeout(() => setBlocked(false), reducedMotion ? 80 : 650);
      }
      return;
    }
    setCaught(false);
    setMessage(scene.hint);
  }

  const progress = useMemo(() => [0, 1, 2, 3], []);

  return (
    <main className={`minimal-game ${reducedMotion ? 'reduce-motion' : ''}`}>
      {stage === 0 && (
        <PhoneScene
          selected={selection}
          message={message}
          onToggle={togglePhoneItem}
          onRead={() => moveTo(1)}
        />
      )}
      {stage > 0 && stage < 4 && (
        <OperationScene
          stage={stage}
          result={result}
          solved={solved}
          caught={caught}
          blocked={blocked}
          message={message}
          onToggle={toggleResult}
          onCheck={checkResult}
        />
      )}
      {stage === 4 && <Ending onReplay={() => moveTo(0)} />}

      <div className="quiet-controls">
        <button type="button" onClick={() => setNote(currentConcept)} aria-label="show concept note">?</button>
        <div aria-label={`scene ${Math.min(stage, 3) + 1} of 4`}>
          {progress.map((step) => <i key={step} className={step === Math.min(stage, 3) ? 'active' : step < stage ? 'passed' : ''} />)}
        </div>
      </div>

      <div className={`cinematic-cut ${cutting ? 'play' : ''}`} aria-hidden="true"><i /><i /><i /></div>
      {note && <ConceptNote concept={note} onClose={closeNote} />}
    </main>
  );
}
