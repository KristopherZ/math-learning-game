import { MathTex } from '../../MathTex';
import { machineCodomain, machineInputs, rangeOf } from '../chapterZeroTwo';
import { cx } from '../cn';
import { Agent } from '../components/Agent';
import type { MachineLinks } from '../hooks/useFunctionProgress';

export function MachineScene({
  links,
  solved,
  message,
  onToggle,
  onCheck,
}: {
  links: MachineLinks;
  solved: boolean;
  message: string;
  onToggle: (input: number, output: number) => void;
  onCheck: () => void;
}) {
  const range = rangeOf(machineInputs.flatMap((input) => links[input]));
  return (
    <section
      className={cx('world-scene', 'function-scene', 'machine-scene', solved && 'solved')}
      aria-label="function machine relay"
    >
      <div className="scene-number">0.2</div>
      <p className="scene-whisper">wire the +1 relay so every input produces exactly one output</p>
      <div className="function-header">
        <MathTex
          tex={String.raw`f\colon A\to B,\qquad f(x)=x+1`}
          fallback="f: A → B, f(x)=x+1"
          className="math-tex"
        />
      </div>
      <div className="function-legend">
        <span>
          <small>domain A</small>
          {'{ 0, 1, 2 }'}
        </span>
        <span>
          <small>codomain B</small>
          {'{ 1, 2, 3, 4 }'}
        </span>
        <span>
          <small>range f(A)</small>
          {range.length ? `{ ${range.join(', ')} }` : '{ }'}
        </span>
      </div>
      <div className="machine-console">
        {machineInputs.map((input) => (
          <div className="machine-wire-row" key={input}>
            <strong>{input}</strong>
            <i aria-hidden="true" />
            <span className="function-machine">
              <b>+1</b>
            </span>
            <i aria-hidden="true" />
            <div>
              {machineCodomain.map((output) => (
                <button
                  type="button"
                  key={output}
                  className={cx(links[input].includes(output) && 'selected')}
                  aria-pressed={links[input].includes(output)}
                  aria-label={`connect input ${input} to output ${output}`}
                  onClick={() => onToggle(input, output)}
                >
                  {output}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="function-check" type="button" onClick={onCheck}>
        route signal
      </button>
      <Agent crossing={solved} />
      <p className="scene-message">{message}</p>
    </section>
  );
}
