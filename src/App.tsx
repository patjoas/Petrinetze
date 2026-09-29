import { useState } from 'react';
import { enabledTransitions, fire, type Marking } from './core/petriNet';
import { producerConsumer as net } from './core/examples';

/** Erste Ausbaustufe: Markenspiel („token game“) für ein Beispielnetz. */
export default function App() {
  const [marking, setMarking] = useState<Marking>(net.initialMarking);
  const [trace, setTrace] = useState<string[]>([]);
  const enabled = new Set(enabledTransitions(net, marking));

  const onFire = (t: string) => {
    setMarking(fire(net, marking, t));
    setTrace((tr) => [...tr, t]);
  };

  const reset = () => {
    setMarking(net.initialMarking);
    setTrace([]);
  };

  return (
    <main>
      <h1>Petrinetze</h1>
      <p>Beispiel: Erzeuger/Verbraucher mit Puffer (Kapazität 3)</p>

      <h2>Markierung</h2>
      <ul>
        {net.places.map((p) => (
          <li key={p.id}>
            {p.label ?? p.id}: <strong>{marking[p.id] ?? 0}</strong>
            {p.capacity !== undefined && ` / ${p.capacity}`}
          </li>
        ))}
      </ul>

      <h2>Transitionen</h2>
      <div className="row">
        {net.transitions.map((t) => (
          <button key={t.id} disabled={!enabled.has(t.id)} onClick={() => onFire(t.id)}>
            {t.label ?? t.id}
          </button>
        ))}
        <button className="secondary" onClick={reset}>Zurücksetzen</button>
      </div>

      <h2>Schaltfolge</h2>
      <p>{trace.length ? trace.join(' → ') : '—'}</p>
    </main>
  );
}
