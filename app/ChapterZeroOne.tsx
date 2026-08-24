'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  archiveItems,
  conceptBriefings,
  equalSets,
  formatSet,
  obstacles,
  targetManifest,
  unique,
  type ConceptKey,
} from './game/chapterZeroOne';

const SEEN_KEY = 'project-proof-seen-concepts';
const MOTION_KEY = 'project-proof-reduced-motion';

function Agent({ state = 'ready' }: { state?: 'ready' | 'moving' | 'success' }) {
  return (
    <div className={`agent agent-${state}`} aria-label={`Agent Delta is ${state}`}>
      <span className="agent-shadow" />
      <span className="agent-head"><i /></span>
      <span className="agent-scarf">Δ</span>
      <span className="agent-body" />
      <span className="agent-arm left" /><span className="agent-arm right" />
      <span className="agent-leg left" /><span className="agent-leg right" />
    </div>
  );
}

function SetLine({ values, label }: { values: string[]; label?: string }) {
  return (
    <span className="set-line">
      {label && <b>{label} =</b>}
      <span aria-label={`set containing ${values.join(', ')}`}>{formatSet(values)}</span>
    </span>
  );
}

function ConceptModal({ concept, onClose }: { concept: ConceptKey; onClose: () => void }) {
  const note = conceptBriefings[concept];
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="concept-modal" role="dialog" aria-modal="true" aria-labelledby="concept-title">
        <div className="modal-symbol" aria-hidden="true">{note.symbol}</div>
        <div className="modal-copy">
          <p className="eyebrow">{note.eyebrow} · CONCEPT BRIEFING</p>
          <h2 id="concept-title">{note.title}</h2>
          <p>{note.explanation}</p>
          <div className="concept-rule"><span>FIELD RULE</span><strong>{note.rule}</strong></div>
          <code>{note.example}</code>
          <p className="concept-insight"><i /> {note.insight}</p>
        </div>
        <button className="primary-action modal-action" type="button" onClick={onClose} autoFocus>
          Understood <span aria-hidden="true">→</span>
        </button>
      </section>
    </div>
  );
}

function BriefingButtons({ onOpen }: { onOpen: (key: ConceptKey) => void }) {
  return (
    <div className="field-notes" aria-label="Concept field notes">
      <span>FIELD NOTES</span>
      <div>
        {(Object.keys(conceptBriefings) as ConceptKey[]).map((key) => (
          <button type="button" key={key} onClick={() => onOpen(key)} title={`Review ${key}`}>
            {conceptBriefings[key].symbol}
          </button>
        ))}
      </div>
    </div>
  );
}

function PackingScene({
  selected,
  onToggle,
  onSeal,
  onBriefing,
  feedback,
  duplicateNotice,
}: {
  selected: string[];
  onToggle: (id: string) => void;
  onSeal: () => void;
  onBriefing: () => void;
  feedback: string;
  duplicateNotice: boolean;
}) {
  const selectedItems = archiveItems.filter((item) => selected.includes(item.id));
  const selectedLabels = selectedItems.map((item) => item.label);
  const suitcaseSet = unique(selectedLabels);
  const ready = equalSets(suitcaseSet, targetManifest);

  return (
    <section className="mission-layout" id="mission">
      <aside className="brief-panel">
        <p className="eyebrow">MISSION 0.1 · DOCUMENT ROOM</p>
        <h1>Pack the right set.</h1>
        <p className="mission-copy">The suitcase will unlock only when its contents equal the extraction manifest.</p>
        <div className="target-card">
          <div className="target-heading"><span>Target set M</span><span className="classified">CLASSIFIED</span></div>
          <SetLine values={targetManifest.map((item) => item.toLowerCase())} label="M" />
          <p className="target-note">Order does not matter. Contents do.</p>
        </div>
        <button className="briefing-button" type="button" onClick={onBriefing}>
          <span className="button-icon">i</span>Review set equality<span aria-hidden="true">→</span>
        </button>
        <div className="handler-note">
          <span className="handler-avatar">H</span>
          <p><strong>Handler</strong>Select documents until suitcase set S equals M.</p>
        </div>
      </aside>

      <section className={`document-room ${ready ? 'room-ready' : ''}`} aria-label="Geometric document room puzzle">
        <div className="room-grid" aria-hidden="true" />
        <div className="room-title"><span>ARCHIVE 07</span><strong>SELECT DOCUMENTS</strong></div>
        <div className="archive-wall" aria-hidden="true">
          <span className="cabinet cabinet-a" /><span className="cabinet cabinet-b" />
          <span className="cabinet cabinet-c" /><span className="scanner-ring" />
        </div>

        <div className="document-tray" aria-label="Available documents">
          {archiveItems.map((item) => {
            const packed = selected.includes(item.id);
            return (
              <button
                className={`document-card ${item.tone} ${packed ? 'packed' : ''}`}
                type="button"
                key={item.id}
                aria-pressed={packed}
                onClick={() => onToggle(item.id)}
              >
                <span className="document-symbol" aria-hidden="true">{item.symbol}</span>
                <span>{item.label}</span><small>{packed ? 'Packed · tap to remove' : 'Tap to pack'}</small>
              </button>
            );
          })}
        </div>

        <Agent state={ready ? 'success' : 'ready'} />

        <div className="suitcase-zone">
          <div className="case-label"><span>SUITCASE SET</span><strong>S = {formatSet(suitcaseSet.map((item) => item.toLowerCase()))}</strong></div>
          <div className={`suitcase ${ready ? 'case-ready' : ''}`} aria-label={`Suitcase set ${formatSet(suitcaseSet)}`}>
            <span className="case-handle" /><span className="case-latch left" /><span className="case-latch right" />
            <div className="packed-items">
              {selectedItems.length === 0 ? <span className="empty-case">Select a document</span> : selectedItems.map((item) => (
                <span className={`packed-item ${item.tone}`} key={item.id}>{item.symbol}</span>
              ))}
            </div>
            {duplicateNotice && <span className="duplicate-note">Duplicate detected — S is unchanged</span>}
          </div>
          <button className="primary-action seal-action" type="button" onClick={onSeal} disabled={!ready}>
            {ready ? 'Seal suitcase & leave' : 'Match M to unlock'} <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className={`exit-door ${ready ? 'door-ready' : ''}`} aria-hidden="true">
          <span className="door-light" /><span className="door-line" /><strong>{ready ? 'OPEN' : 'EXIT'}</strong>
        </div>
        <p className="room-feedback" aria-live="polite">{feedback}</p>
      </section>
    </section>
  );
}

function ObstacleScene({
  index,
  result,
  solved,
  feedback,
  onToggle,
  onCheck,
  onContinue,
  onBriefing,
}: {
  index: number;
  result: string[];
  solved: boolean;
  feedback: string;
  onToggle: (element: string) => void;
  onCheck: () => void;
  onContinue: () => void;
  onBriefing: () => void;
}) {
  const obstacle = obstacles[index];
  const availableElements = unique([...obstacle.left, ...obstacle.right]);
  return (
    <section className="mission-layout obstacle-layout" id="mission">
      <aside className="brief-panel obstacle-brief">
        <p className="eyebrow">ESCAPE ROUTE · GATE 0{index + 1}</p>
        <h1>{obstacle.title}</h1>
        <p className="mission-copy">{obstacle.instruction}</p>
        <div className="target-card operation-card">
          <div className="target-heading"><span>Required operation</span><span className="classified">{obstacle.codename}</span></div>
          <strong className="operation-symbol">{obstacle.expression}</strong>
          <p className="target-note">Use the operation lens to construct the result.</p>
        </div>
        <button className="briefing-button" type="button" onClick={onBriefing}>
          <span className="button-icon">i</span>Review {obstacle.concept}<span aria-hidden="true">→</span>
        </button>
      </aside>

      <section className={`escape-room ${solved ? 'gate-solved' : ''}`} aria-label={`${obstacle.codename} set operation test`}>
        <div className="room-grid" aria-hidden="true" />
        <div className="corridor-lines" aria-hidden="true"><i /><i /><i /></div>
        <div className="gate-heading"><span>{obstacle.codename}</span><strong>{solved ? 'ACCESS VERIFIED' : 'ACCESS BLOCKED'}</strong></div>
        <div className="set-display" aria-label="Input sets">
          <div className="venn-set set-a"><b>{obstacle.leftLabel}</b>{obstacle.left.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="venn-set set-b"><b>{obstacle.rightLabel}</b>{obstacle.right.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
        <div className="equation-beam"><span>{obstacle.expression}</span><i /></div>

        <div className="math-tool" aria-label={`${obstacle.concept} operation lens`}>
          <div className="tool-heading"><span>OPERATION LENS</span><strong>{obstacle.expression}</strong></div>
          <p>Activate every element that belongs in the result set.</p>
          <div className="element-tools" role="group" aria-label="Elements available for the result set">
            {availableElements.map((element) => (
              <button
                type="button"
                key={element}
                className={result.includes(element) ? 'selected' : ''}
                onClick={() => onToggle(element)}
                disabled={solved}
                aria-pressed={result.includes(element)}
              >
                <i />{element}
              </button>
            ))}
          </div>
          <div className="constructed-set"><span>RESULT</span><strong>{formatSet(result)}</strong></div>
          <button className="tool-check" type="button" onClick={onCheck} disabled={solved || result.length === 0}>
            Run operation
          </button>
        </div>

        <div className="gate-assembly" aria-hidden="true">
          <span className="gate-panel left" /><span className="gate-panel right" /><span className="gate-core">{obstacle.expression}</span>
        </div>
        <Agent state={solved ? 'moving' : 'ready'} />

        <div className={`answer-feedback ${feedback ? solved ? 'success' : 'retry' : ''}`} aria-live="polite">
          <i /> <span>{feedback || 'Build the result set with the operation lens.'}</span>
        </div>
        {solved && (
          <button className="primary-action continue-action" type="button" onClick={onContinue}>
            {index === obstacles.length - 1 ? 'Complete extraction' : 'Cross the gate'} <span aria-hidden="true">→</span>
          </button>
        )}
      </section>
    </section>
  );
}

function MissionComplete({ onReplay }: { onReplay: () => void }) {
  return (
    <section className="complete-screen" id="mission">
      <div className="complete-orbit" aria-hidden="true"><i /><i /><i /></div>
      <Agent state="success" />
      <p className="eyebrow">MISSION 0.1 · EXTRACTION COMPLETE</p>
      <h1>Document room cleared.</h1>
      <p>You matched equal sets and escaped using union, intersection, and difference.</p>
      <div className="concept-badges">
        <span><b>=</b> Equality</span><span><b>∪</b> Union</span><span><b>∩</b> Intersection</span><span><b>∖</b> Difference</span>
      </div>
      <div className="debrief-card">
        <span>FIELD ASSESSMENT</span><strong>4 concepts secured</strong><p>Next operation: statements, truth values, and logical connectives.</p>
      </div>
      <button className="primary-action replay-action" type="button" onClick={onReplay}>Replay mission <span aria-hidden="true">↻</span></button>
    </section>
  );
}

export default function ChapterZeroOne() {
  const [stage, setStage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [feedback, setFeedback] = useState('Build suitcase set S to match target set M.');
  const [modal, setModal] = useState<ConceptKey | null>(null);
  const [seen, setSeen] = useState<Set<ConceptKey>>(new Set());
  const [reducedMotion, setReducedMotion] = useState(false);

  const selectedLabels = useMemo(
    () => archiveItems.filter((item) => selected.includes(item.id)).map((item) => item.label),
    [selected],
  );
  const duplicateNotice = selectedLabels.length !== unique(selectedLabels).length;

  useEffect(() => {
    const storedSeen = new Set<ConceptKey>(JSON.parse(localStorage.getItem(SEEN_KEY) || '[]'));
    setSeen(storedSeen);
    const storedMotion = localStorage.getItem(MOTION_KEY);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(storedMotion === null ? prefersReduced : storedMotion === 'true');
    if (!storedSeen.has('equality')) setModal('equality');
  }, []);

  function openConcept(key: ConceptKey, force = false) {
    if (force || !seen.has(key)) setModal(key);
  }

  function closeConcept() {
    if (!modal) return;
    const next = new Set(seen).add(modal);
    setSeen(next);
    localStorage.setItem(SEEN_KEY, JSON.stringify([...next]));
    setModal(null);
  }

  function toggleDocument(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    setFeedback('Suitcase set updated. Compare its distinct members with M.');
  }

  function enterObstacle(nextStage: number) {
    setStage(nextStage);
    setResult([]);
    setSolved(false);
    setFeedback('');
    const nextConcept = obstacles[nextStage - 1]?.concept;
    if (nextConcept) openConcept(nextConcept);
  }

  function sealSuitcase() {
    if (!equalSets(selectedLabels, targetManifest)) return;
    setFeedback('Set equality verified. Exit route unlocked.');
    window.setTimeout(() => enterObstacle(1), reducedMotion ? 80 : 650);
  }

  function toggleResult(element: string) {
    setResult((current) => current.includes(element) ? current.filter((item) => item !== element) : [...current, element]);
    setSolved(false);
    setFeedback('');
  }

  function checkResult() {
    const obstacle = obstacles[stage - 1];
    const expected = obstacle.options[obstacle.correct];
    const isCorrect = equalSets(result, expected);
    setSolved(isCorrect);
    setFeedback(isCorrect ? obstacle.success : obstacle.retry);
  }

  function continueMission() {
    if (stage === obstacles.length) {
      setStage(4);
      setResult([]);
      setSolved(false);
      return;
    }
    enterObstacle(stage + 1);
  }

  function replayMission() {
    setStage(0);
    setSelected([]);
    setResult([]);
    setSolved(false);
    setFeedback('Build suitcase set S to match target set M.');
  }

  function toggleMotion() {
    const next = !reducedMotion;
    setReducedMotion(next);
    localStorage.setItem(MOTION_KEY, String(next));
  }

  const progressStage = Math.min(stage, 3);
  const activeConcept = stage === 0 ? 'equality' : obstacles[Math.min(stage - 1, 2)]?.concept;

  return (
    <main className={`game-shell ${reducedMotion ? 'reduce-motion' : ''}`}>
      <header className="mission-bar">
        <a className="brand" href="#mission" aria-label="Project Proof current mission">
          <span className="brand-mark">Δ</span>
          <span><strong>PROJECT: PROOF</strong><small>The Continuum · Field Operations</small></span>
        </a>
        <div className="chapter-chip" aria-label="Current chapter"><span>CHAPTER 0</span><strong>Sets &amp; Logic</strong></div>
        <div className="header-actions">
          <div className="mission-progress" aria-label={`Mission progress, step ${progressStage + 1} of 4`}>
            {[0, 1, 2, 3].map((node) => (
              <span key={node} className="progress-part">
                {node > 0 && <span className={`progress-line ${node <= progressStage ? 'complete' : ''}`} />}
                <span className={`progress-node ${node === progressStage ? 'active' : node < progressStage || stage === 4 ? 'complete' : ''}`} />
              </span>
            ))}
          </div>
          <button className="motion-toggle" type="button" onClick={toggleMotion} aria-pressed={reducedMotion}>
            {reducedMotion ? 'Motion: calm' : 'Motion: full'}
          </button>
        </div>
      </header>

      {stage === 0 && (
        <PackingScene
          selected={selected}
          onToggle={toggleDocument}
          onSeal={sealSuitcase}
          onBriefing={() => openConcept('equality', true)}
          feedback={feedback}
          duplicateNotice={duplicateNotice}
        />
      )}
      {stage > 0 && stage < 4 && (
        <ObstacleScene
          index={stage - 1}
          result={result}
          solved={solved}
          feedback={feedback}
          onToggle={toggleResult}
          onCheck={checkResult}
          onContinue={continueMission}
          onBriefing={() => activeConcept && openConcept(activeConcept, true)}
        />
      )}
      {stage === 4 && <MissionComplete onReplay={replayMission} />}

      <footer className="status-strip">
        <BriefingButtons onOpen={(key) => openConcept(key, true)} />
        <span className="status-message"><i className={solved || stage === 4 ? 'ok' : ''} /> {stage === 0 ? 'Suitcase manifest active' : stage === 4 ? 'Extraction complete' : `Gate ${stage} operation test`}</span>
        <span>{String(progressStage + 1).padStart(2, '0')} / 04</span>
      </footer>

      {modal && <ConceptModal concept={modal} onClose={closeConcept} />}
    </main>
  );
}
