'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  archiveObjects,
  cipherSteps,
  conceptNotes,
  copyFiles,
  copySlots,
  doorNeed,
  doorScenes,
  equalSets,
  formatSet,
  requiredCopies,
  unique,
  type ConceptKey,
  type ObjectKind,
  type WorldObject,
} from './game/chapterZeroOne';
import { MathTex, conceptTex, plainSetToTex } from './MathTex';
import styles from './ChapterZeroOne.module.css';

const SEEN_KEY = 'project-proof-minimal-v1-seen-concepts';
type AudioCue = 'click' | 'confirm' | 'error' | 'drop';

function cx(...names: Array<string | false | null | undefined>) {
  return names.filter((name): name is string => Boolean(name)).map((name) => styles[name]).join(' ');
}

const kindLabel: Record<ObjectKind, string> = {
  key: 'key',
  photo: 'ID card',
  map: 'map',
  seal: 'seal',
  ticket: 'ticket',
  tracker: 'tracker',
};

function ObjectMark({ kind }: { kind: ObjectKind }) {
  return <span className={cx('object-mark', `mark-${kind}`)} aria-hidden="true"><i /></span>;
}

function ObjectButton({ item, selected, onClick, disabled = false }: {
  item: WorldObject;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={cx('world-object', selected && 'selected')}
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
    <div className={cx('minimal-agent', crossing && 'crossing', caught && 'caught', blocked && 'blocked')} role="img" aria-label="Euler e, the main character, wearing a cowboy hat">
      <span className={cx('e-hat')} aria-hidden="true" />
      <span className={cx('e-arm', 'e-arm-left')} aria-hidden="true" />
      <span className={cx('e-arm', 'e-arm-right')} aria-hidden="true" />
      <span className={cx('e-glyph')} aria-hidden="true">
        e
        <span className={cx('e-eyes')}><i /><i /></span>
      </span>
      <span className={cx('e-leg', 'e-leg-left')} aria-hidden="true" />
      <span className={cx('e-leg', 'e-leg-right')} aria-hidden="true" />
    </div>
  );
}

function ConceptNote({ concept, onClose }: { concept: ConceptKey; onClose: () => void }) {
  const note = conceptNotes[concept];
  return (
    <div className={cx('note-shade')}>
      <section className={cx('tiny-note')} role="dialog" aria-modal="true" aria-label={`${concept} concept note`}>
        <strong><MathTex tex={conceptTex[concept]} fallback={note.symbol} className={cx('math-tex')} /></strong>
        <p>{note.line}</p>
        <code><MathTex tex={note.texExample} fallback={note.example} className={cx('math-tex')} /></code>
        <button type="button" onClick={onClose} autoFocus>continue</button>
      </section>
    </div>
  );
}

function Prologue({ onBegin }: { onBegin: () => void }) {
  return (
    <section className={cx('world-scene', 'prologue-scene')} aria-label="Project Proof demo briefing">
      <div className={cx('prologue-grid')} aria-hidden="true"><i /><i /><i /><i /></div>
      <div className={cx('prologue-copy')}>
        <span className={cx('prologue-kicker')}>interactive math game · demo</span>
        <h1>PROJECT: PROOF</h1>
        <p>A coded transmission has surfaced in the archive.</p>
        <p>Guide Euler <em>e</em> through the mission. Math is the tool; every choice changes the escape.</p>
        <button type="button" onClick={onBegin}>begin demo</button>
      </div>
      <div className={cx('briefing-route')} aria-hidden="true">
        <span>message</span><i /><span>archive</span><i /><span>exchange</span><i /><span>escape</span>
      </div>
      <Agent />
    </section>
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
    <section className={cx('world-scene', 'phone-scene', unlocked && 'unlocked')} aria-label="encrypted field phone">
      <div className={cx('scene-number')}>0.1</div>
      <p className={cx('scene-whisper')}>take the key and ID card required by the phone</p>
      <div className={cx('phone-items')} aria-label="objects available for phone authentication">
        {archiveObjects.map((item) => (
          <ObjectButton key={item.id} item={item} selected={selected.includes(item.id)} onClick={() => onToggle(item.id)} />
        ))}
      </div>
      <div className={cx('field-phone')}>
        <span className={cx('phone-speaker')} aria-hidden="true" />
        <div className={cx('phone-screen')} aria-live="polite">
          <div className={cx('phone-set', 'target-set')} aria-label="required set D contains a key and ID card">
            <MathTex tex={'D=\\{'} fallback="D = {" className={cx('math-tex')} /><ObjectMark kind="key" /><ObjectMark kind="photo" /><MathTex tex={'\\}'} fallback="}" className={cx('math-tex')} />
          </div>
          <div className={cx('phone-set', 'chosen-set')} aria-label={`selected set S ${formatSet(unique(chosenKinds).map((kind) => kindLabel[kind]))}`}>
            <MathTex tex={'S=\\{'} fallback="S = {" className={cx('math-tex')} />{chosen.map((item) => <ObjectMark key={item.id} kind={item.kind} />)}<MathTex tex={'\\}'} fallback="}" className={cx('math-tex')} />
          </div>
          {duplicate && <small>repeat ignored</small>}
          {unlocked && <><b>message received</b><small>take everything named in either document</small></>}
        </div>
        {unlocked && <button className={cx('read-message')} type="button" onClick={onRead}>continue</button>}
      </div>
      <Agent />
      <p className={cx('scene-message')} aria-live="polite">{message}</p>
    </section>
  );
}

function SecurityCamera({ ready, caught }: {
  ready: boolean;
  caught: boolean;
}) {
  return (
    <div className={cx('security-camera', ready && 'decoyed', caught && 'caught')} aria-label={caught ? 'the security camera catches e' : ready ? 'the security camera follows the abandoned tracker' : 'one security camera searching'}>
      <span className={cx('camera-bracket')} aria-hidden="true" />
      <span className={cx('camera-aim')} aria-hidden="true">
        <span className={cx('camera-field')} />
        <span className={cx('camera-head')}><i /></span>
      </span>
      <span className={cx('camera-status')}>{caught ? 'caught' : ready ? 'decoy found' : 'searching'}</span>
    </div>
  );
}

function TrackerDecoy({ active }: { active: boolean }) {
  return (
    <div className={cx('tracker-decoy', active && 'active')} aria-label={active ? 'tracker left behind as a decoy' : 'tracker carried by e'}>
      <ObjectMark kind="tracker" />
      <i aria-hidden="true" />
    </div>
  );
}

function DocumentCase({ ready }: { ready: boolean }) {
  return (
    <div className={cx('document-case', ready && 'packed')} aria-label={ready ? 'document-room case packed with every required item' : 'empty document-room case'}>
      <span className={cx('document-handle')} aria-hidden="true" />
      <span className={cx('document-lid')} aria-hidden="true" />
      <span className={cx('packed-items')} aria-hidden="true"><ObjectMark kind="key" /><ObjectMark kind="photo" /><ObjectMark kind="map" /></span>
      <span className={cx('document-status')}>{ready ? 'all required' : <MathTex tex={'A\\mathbin{\\cup}B'} fallback="A ∪ B" className={cx('math-tex')} />}</span>
    </div>
  );
}

function SpyContact({ ready }: { ready: boolean }) {
  return (
    <div className={cx('spy-contact', ready && 'exchange-ready')} aria-label={ready ? 'spy accepts the shared item' : 'spy waiting for the shared item'}>
      <span className={cx('spy-hat')} aria-hidden="true" />
      <span className={cx('spy-head')} aria-hidden="true"><i /><i /></span>
      <span className={cx('spy-body')} aria-hidden="true" />
      <span className={cx('spy-hand')} aria-hidden="true" />
      <span className={cx('exchange-item')} aria-hidden="true"><ObjectMark kind="photo" /></span>
      <span className={cx('spy-status')}>{ready ? 'exchange' : <MathTex tex={'A\\mathbin{\\cap}B'} fallback="A ∩ B" className={cx('math-tex')} />}</span>
    </div>
  );
}

function SourceSet({ label, objects }: { label: string; objects: WorldObject[] }) {
  return (
    <div className={cx('source-set', `source-${label.toLowerCase()}`)} aria-label={`set ${label}: ${objects.map((item) => item.label).join(', ')}`}>
      <MathTex tex={`${label}=\\{`} fallback={`${label} = {`} className={cx('set-notation', 'math-tex')} />
      <div>{objects.map((item) => <ObjectMark key={item.id} kind={item.kind} />)}</div>
      <MathTex tex={'\\}'} fallback="}" className={cx('set-notation', 'math-tex')} />
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
    <section className={cx('world-scene', 'operation-scene', `operation-${scene.concept}`, solved && 'solved', caught && 'caught')} aria-label={`${scene.concept} enemy-evasion puzzle`}>
      <div className={cx('scene-number')}>0.1</div>
      <div className={cx('sky-lines')} aria-hidden="true"><i /><i /><i /></div>
      <div className={cx('operation-architecture')} aria-hidden="true"><i /><i /><i /></div>
      <div className={cx('floor-path')} aria-hidden="true" />

      <p className={cx('scene-whisper')}>{scene.prompt}</p>
      <div className={cx('operation-sources')}>
        <SourceSet label="A" objects={scene.left} />
        <MathTex tex={conceptTex[scene.concept]} fallback={scene.symbol} className={cx('world-symbol', 'math-tex', `operator-${scene.concept}`)} />
        <SourceSet label="B" objects={scene.right} />
      </div>

      <div className={cx('take-tray')} aria-label="things available to place in the result set">
        {candidates.map((kind) => {
          const item: WorldObject = { id: `tool-${kind}`, kind, label: kindLabel[kind] };
          return <ObjectButton key={kind} item={item} selected={result.includes(kind)} onClick={() => onToggle(kind)} disabled={solved} />;
        })}
      </div>

      <div className={cx('result-bowl')} aria-label={`A ${scene.concept} B equals ${formatSet(result.map((kind) => kindLabel[kind]))}`}>
        <div className={cx('result-equation')}>
          <MathTex
            tex={`A\\mathbin{${conceptTex[scene.concept]}}B=`}
            fallback={`A ${scene.symbol} B =`}
            className={cx('set-notation', 'result-notation', 'math-tex')}
          />
          <MathTex tex={'\\{'} fallback="{" className={cx('set-brace', 'math-tex')} />
          <div className={cx('result-members')}>{result.map((kind) => <ObjectMark key={kind} kind={kind} />)}</div>
          <MathTex tex={'\\}'} fallback="}" className={cx('set-brace', 'math-tex')} />
        </div>
        {!solved && <button type="button" onClick={onCheck} disabled={result.length === 0 || caught || blocked}>use</button>}
      </div>

      <Agent crossing={solved} caught={caught} blocked={blocked} />
      {scene.concept === 'union' && <DocumentCase ready={solved} />}
      {scene.concept === 'intersection' && <SpyContact ready={solved} />}
      {scene.concept === 'difference' && <><TrackerDecoy active={solved} /><SecurityCamera ready={solved} caught={caught} /></>}
      <p className={cx('scene-message')} aria-live="polite">{message}</p>
    </section>
  );
}

function CartesianScene({ selected, solved, message, onToggle, onCheck }: {
  selected: string[];
  solved: boolean;
  message: string;
  onToggle: (pair: string) => void;
  onCheck: () => void;
}) {
  return (
    <section className={cx('world-scene', 'cartesian-scene', solved && 'solved')} aria-label="Cartesian product archive-copy puzzle">
      <div className={cx('scene-number')}>0.1</div>
      <p className={cx('scene-whisper')}>copy every stolen file into every safe archive slot</p>

      <div className={cx('copy-equation')} aria-label="files Cartesian product archive slots">
        <MathTex tex={'F=\\{'} fallback="F = {" className={cx('math-tex')} />
        <span className={cx('copy-source')}><ObjectMark kind="photo" /><ObjectMark kind="map" /></span>
        <MathTex tex={'\\}'} fallback="}" className={cx('math-tex')} />
        <MathTex tex={'\\times'} fallback="×" className={cx('math-tex', 'copy-operator')} />
        <MathTex tex={'C=\\{\\alpha,\\beta\\}'} fallback="C = { α, β }" className={cx('math-tex')} />
      </div>

      <div className={cx('copy-matrix')} aria-label="ordered file and archive-slot pairs">
        <span className={cx('matrix-corner')}><MathTex tex={'F\\mathbin{\\times}C'} fallback="F × C" className={cx('math-tex')} /></span>
        {copySlots.map((slot) => <span key={slot.id} className={cx('matrix-slot')}><MathTex tex={slot.id === 'alpha' ? '\\alpha' : '\\beta'} fallback={slot.label} className={cx('math-tex')} /></span>)}
        {copyFiles.map((file) => (
          <div className={cx('matrix-row')} key={file.id}>
            <span className={cx('matrix-file')}><ObjectMark kind={file.id === 'id' ? 'photo' : 'map'} />{file.label}</span>
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
                  <span>(</span><ObjectMark kind={file.id === 'id' ? 'photo' : 'map'} /><span>, {slot.label})</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className={cx('copy-status', solved && 'complete')} aria-live="polite">
        <span>{solved ? '4 copies complete' : `${selected.length} / 4 paired`}</span>
        {!solved && <button type="button" onClick={onCheck} disabled={selected.length === 0}>copy</button>}
      </div>

      <Agent crossing={solved} />
      <p className={cx('scene-message')} aria-live="polite">{message}</p>
    </section>
  );
}

const cipherConcepts: ConceptKey[] = ['union', 'intersection', 'difference', 'cartesian'];

function CipherScene({ stepIndex, solved, wrong, applied, message, onChoose }: {
  stepIndex: number;
  solved: boolean;
  wrong: boolean;
  applied: ConceptKey | null;
  message: string;
  onChoose: (concept: ConceptKey) => void;
}) {
  const step = cipherSteps[Math.min(stepIndex, cipherSteps.length - 1)];
  const finalStep = stepIndex === cipherSteps.length - 1;
  const resultVisible = finalStep ? solved : applied === step.concept;

  return (
    <section className={cx('world-scene', 'cipher-scene', solved && 'solved', wrong && 'wrong', applied && 'applying')} aria-label="combined set-operation secret-code puzzle">
      <div className={cx('scene-number')}>0.1</div>
      <p className={cx('scene-whisper')}>decipher the copied strip—choose the set tool that performs each instruction</p>
      <div className={cx('cipher-thread')} aria-hidden="true">
        {cipherSteps.map((_, index) => <i key={index} className={cx(index < stepIndex && 'passed', index === stepIndex && 'active', index === stepIndex && applied && 'resolving')} />)}
      </div>

      <div className={cx('cipher-instruction')} key={`instruction-${stepIndex}`}>
        <small>{String(Math.min(stepIndex + 1, 5)).padStart(2, '0')}</small>
        <p>{step.instruction}</p>
      </div>

      <div className={cx('cipher-equation')} key={`equation-${stepIndex}`} aria-live="polite">
        {solved ? (
          <div className={cx('final-code-line')}>
            <code><MathTex tex={plainSetToTex(step.result)} fallback={step.result} className={cx('math-tex')} /></code><i>→</i><strong>code 22</strong>
          </div>
        ) : (
          <>
            <MathTex tex={plainSetToTex(step.left)} fallback={step.left} className={cx('math-tex')} />
            <b className={cx('cipher-gap')}>{applied ? <MathTex tex={conceptTex[applied]} fallback={conceptNotes[applied].symbol} className={cx('math-tex')} /> : '?'}</b>
            <MathTex tex={plainSetToTex(step.right)} fallback={step.right} className={cx('math-tex')} />
            <i>→</i>
            <code className={cx(!resultVisible && 'cipher-masked')}>{resultVisible ? <MathTex tex={plainSetToTex(step.result)} fallback={step.result} className={cx('math-tex')} /> : '••••'}</code>
          </>
        )}
      </div>

      <div className={cx('cipher-tools')} aria-label="set tools">
        {cipherConcepts.map((concept) => (
          <button
            type="button"
            key={concept}
            className={cx(applied === concept && 'chosen')}
            aria-label={`use ${concept}`}
            disabled={solved || Boolean(applied)}
            onClick={() => onChoose(concept)}
          >
            <strong className={cx(`operator-${concept}`)}><MathTex tex={conceptTex[concept]} fallback={conceptNotes[concept].symbol} className={cx('math-tex')} /></strong>
            <span>{concept}</span>
          </button>
        ))}
      </div>

      <Agent crossing={solved} blocked={wrong} />
      <p className={cx('scene-message')} aria-live="polite">{message}</p>
    </section>
  );
}

function Ending({ onReplay }: { onReplay: () => void }) {
  return (
    <section className={cx('world-scene', 'ending-scene')} aria-label="chapter complete">
      <div className={cx('ending-rings')} aria-hidden="true"><i /><i /><i /><i /></div>
      <Agent />
      <div className={cx('ending-path')} aria-hidden="true" />
      <p>code delivered</p>
      <span><MathTex tex={'=\\quad\\cup\\quad\\cap\\quad\\setminus\\quad\\times'} fallback="=   ∪   ∩   ∖   ×" className={cx('math-tex')} /></span>
      <button type="button" onClick={onReplay}>↻</button>
    </section>
  );
}

export default function ChapterZeroOne() {
  const [started, setStarted] = useState(false);
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
  const [cipherStep, setCipherStep] = useState(0);
  const [cipherWrong, setCipherWrong] = useState(false);
  const [cipherApplied, setCipherApplied] = useState<ConceptKey | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const effectRefs = useRef<Partial<Record<AudioCue, HTMLAudioElement>>>({});

  const currentConcept: ConceptKey = stage === 0
    ? 'equality'
    : stage < 4
      ? doorScenes[stage - 1].concept
      : stage === 4
        ? 'cartesian'
        : cipherSteps[Math.min(cipherStep, cipherSteps.length - 1)].concept;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = new Set<ConceptKey>(JSON.parse(localStorage.getItem(SEEN_KEY) || '[]'));
      setSeen(stored);
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const music = new Audio('/audio/covert-action.ogg');
    const restartMusic = () => {
      music.currentTime = 0;
      void music.play().catch(() => setSoundOn(false));
    };
    music.loop = false;
    music.volume = 0.14;
    music.preload = 'auto';
    music.addEventListener('ended', restartMusic);
    musicRef.current = music;

    effectRefs.current = {
      click: new Audio('/audio/ui-click.ogg'),
      confirm: new Audio('/audio/ui-confirm.ogg'),
      error: new Audio('/audio/ui-error.ogg'),
      drop: new Audio('/audio/ui-drop.ogg'),
    };
    Object.values(effectRefs.current).forEach((effect) => {
      if (!effect) return;
      effect.volume = 0.24;
      effect.preload = 'auto';
    });

    return () => {
      music.removeEventListener('ended', restartMusic);
      music.pause();
      Object.values(effectRefs.current).forEach((effect) => effect?.pause());
    };
  }, []);

  useEffect(() => {
    const textNodes = Array.from(document.querySelectorAll<HTMLElement>([
      `.${styles['scene-number']}`,
      `.${styles['scene-whisper']}`,
      `.${styles['scene-message']}`,
      `.${styles['door-need']}`,
      `.${styles['set-case']} small`,
      `.${styles['world-object']} > span:last-child`,
      `.${styles['set-notation']}`,
      `.${styles['world-symbol']}`,
      `.${styles['phone-screen']}`,
      `.${styles['document-status']}`,
      `.${styles['spy-status']}`,
      `.${styles['camera-status']}`,
      `.${styles['copy-equation']}`,
      `.${styles['copy-status']}`,
      `.${styles['cipher-instruction']}`,
      `.${styles['cipher-equation']}`,
      `.${styles['prologue-copy']}`,
      `.${styles['briefing-route']}`,
      `.${styles['tiny-note']} p`,
      `.${styles['tiny-note']} code`,
      `.${styles['ending-scene']} > p`,
      `.${styles['ending-scene']} > span`,
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

  function playEffect(cue: AudioCue, force = false) {
    if (!soundOn && !force) return;
    const source = effectRefs.current[cue];
    if (!source) return;
    const effect = source.cloneNode() as HTMLAudioElement;
    effect.volume = source.volume;
    void effect.play().catch(() => undefined);
  }

  function beginDemo() {
    setStarted(true);
    setSoundOn(true);
    void musicRef.current?.play().catch(() => setSoundOn(false));
    playEffect('confirm', true);
    if (!seen.has('equality')) window.setTimeout(() => setNote('equality'), reducedMotion ? 20 : 620);
  }

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    if (next) {
      void musicRef.current?.play().catch(() => setSoundOn(false));
    } else {
      musicRef.current?.pause();
    }
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
      setCipherWrong(false);
      setCipherApplied(null);
      if (nextStage > 0 && nextStage < 5) {
        const concept = nextStage === 4 ? 'cartesian' : doorScenes[nextStage - 1].concept;
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
      playEffect(scene.concept === 'difference' ? 'drop' : 'confirm');
      setCaught(false);
      setBlocked(false);
      setMessage(scene.success);
      window.setTimeout(() => moveTo(stage + 1), reducedMotion ? 150 : 2400);
      return;
    }
    if (scene.concept === 'difference') {
      if (result.includes('tracker')) {
        playEffect('error');
        setBlocked(false);
        setCaught(true);
        setMessage(`caught — ${scene.caughtHint || scene.hint}`);
        window.setTimeout(() => setCaught(false), reducedMotion ? 120 : 1350);
      } else {
        playEffect('error');
        setCaught(false);
        setBlocked(true);
        setMessage(`stopped — ${scene.missingHint || scene.hint}`);
        window.setTimeout(() => setBlocked(false), reducedMotion ? 80 : 650);
      }
      return;
    }
    playEffect('error');
    setCaught(false);
    setMessage(scene.hint);
  }

  function toggleCopy(pair: string) {
    setSelection((current) => current.includes(pair) ? current.filter((item) => item !== pair) : [...current, pair]);
    setSolved(false);
    setMessage('');
  }

  function checkCopies() {
    const correct = equalSets(selection, requiredCopies);
    setSolved(correct);
    if (!correct) {
      playEffect('error');
      setMessage('Every file needs one ordered pair with each archive slot.');
      return;
    }
    playEffect('confirm');
    setMessage('Four paired copies are complete. The final strip contains an encrypted code.');
    window.setTimeout(() => moveTo(5), reducedMotion ? 150 : 2500);
  }

  function chooseCipherTool(concept: ConceptKey) {
    if (cipherApplied) return;
    const step = cipherSteps[cipherStep];
    if (concept !== step.concept) {
      playEffect('error');
      setCipherWrong(true);
      setMessage('The strips misalign—match the instruction to the operation.');
      window.setTimeout(() => setCipherWrong(false), reducedMotion ? 100 : 620);
      return;
    }

    setCipherWrong(false);
    playEffect('confirm');
    setCipherApplied(concept);
    if (cipherStep === cipherSteps.length - 1) {
      setMessage('The signatures align. Decoding the final signal…');
      window.setTimeout(() => {
        setSolved(true);
        setMessage('The pair sets match. Code 22 opens the extraction signal.');
      }, reducedMotion ? 60 : 760);
      window.setTimeout(() => moveTo(6), reducedMotion ? 220 : 3300);
      return;
    }

    setMessage(`${conceptNotes[concept].symbol} routing the signal…`);
    window.setTimeout(() => {
      setCipherStep((current) => current + 1);
      setCipherApplied(null);
      setMessage('');
    }, reducedMotion ? 70 : 720);
  }

  const progress = useMemo(() => [0, 1, 2, 3, 4, 5], []);

  return (
    <main
      className={cx('minimal-game', reducedMotion && 'reduce-motion')}
      onPointerDown={(event) => {
        if (started && soundOn && (event.target as HTMLElement).closest('button')) playEffect('click');
      }}
    >
      <div className={cx('rotate-prompt')} role="status" aria-live="polite">
        <span className={cx('rotate-device')} aria-hidden="true"><i /></span>
        <p>turn your phone sideways</p>
        <small>Project: Proof plays in landscape.</small>
      </div>

      {!started && <Prologue onBegin={beginDemo} />}

      {started && stage === 0 && (
        <PhoneScene
          selected={selection}
          message={message}
          onToggle={togglePhoneItem}
          onRead={() => moveTo(1)}
        />
      )}
      {started && stage > 0 && stage < 4 && (
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
      {started && stage === 4 && (
        <CartesianScene
          selected={selection}
          solved={solved}
          message={message}
          onToggle={toggleCopy}
          onCheck={checkCopies}
        />
      )}
      {started && stage === 5 && (
        <CipherScene
          stepIndex={cipherStep}
          solved={solved}
          wrong={cipherWrong}
          applied={cipherApplied}
          message={message}
          onChoose={chooseCipherTool}
        />
      )}
      {started && stage === 6 && <Ending onReplay={() => { setCipherStep(0); moveTo(0); }} />}

      <span className={cx('demo-mark')}>demo</span>
      {started && <button className={cx('sound-toggle')} type="button" onClick={toggleSound} aria-label={soundOn ? 'mute sound' : 'turn sound on'} aria-pressed={soundOn}>
        <i /><i /><i />
      </button>}

      {started && <div className={cx('quiet-controls')}>
        <button type="button" onClick={() => setNote(currentConcept)} aria-label="show concept note">?</button>
        <div aria-label={`scene ${Math.min(stage, 5) + 1} of 6`}>
          {progress.map((step) => <i key={step} className={cx(step === Math.min(stage, 5) && 'active', step < stage && 'passed')} />)}
        </div>
      </div>}

      <div className={cx('cinematic-cut', cutting && 'play')} aria-hidden="true"><i /><i /><i /></div>
      {note && <ConceptNote concept={note} onClose={closeNote} />}
    </main>
  );
}
