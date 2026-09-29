import type { PetriNet } from './petriNet';

/** Einfaches Erzeuger/Verbraucher-Netz mit Puffer (Kapazität 3). */
export const producerConsumer: PetriNet = {
  places: [
    { id: 'p_ready', label: 'bereit zu erzeugen' },
    { id: 'p_buffer', label: 'Puffer', capacity: 3 },
    { id: 'p_idle', label: 'Verbraucher bereit' },
  ],
  transitions: [
    { id: 't_produce', label: 'erzeugen' },
    { id: 't_consume', label: 'verbrauchen' },
  ],
  arcs: [
    { id: 'a1', source: 'p_ready', target: 't_produce', weight: 1 },
    { id: 'a2', source: 't_produce', target: 'p_ready', weight: 1 },
    { id: 'a3', source: 't_produce', target: 'p_buffer', weight: 1 },
    { id: 'a4', source: 'p_buffer', target: 't_consume', weight: 1 },
    { id: 'a5', source: 'p_idle', target: 't_consume', weight: 1 },
    { id: 'a6', source: 't_consume', target: 'p_idle', weight: 1 },
  ],
  initialMarking: { p_ready: 1, p_idle: 1 },
};
