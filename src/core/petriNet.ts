/**
 * Grundmodell für Stellen/Transitions-Netze (P/T-Netze).
 *
 * Ein Petrinetz N = (P, T, F, W, M0) besteht aus
 *  - Stellen P und Transitionen T (disjunkt),
 *  - Kanten F ⊆ (P × T) ∪ (T × P) mit Gewichten W: F → ℕ⁺,
 *  - einer Anfangsmarkierung M0: P → ℕ.
 */

export type Id = string;

export interface Place {
  id: Id;
  label?: string;
  /** Kapazität; undefined = unbeschränkt */
  capacity?: number;
}

export interface Transition {
  id: Id;
  label?: string;
}

export interface Arc {
  id: Id;
  source: Id;
  target: Id;
  weight: number;
}

/** Markierung: Anzahl der Marken je Stelle (fehlende Einträge = 0) */
export type Marking = Record<Id, number>;

export interface PetriNet {
  places: Place[];
  transitions: Transition[];
  arcs: Arc[];
  initialMarking: Marking;
}

const tokens = (m: Marking, p: Id): number => m[p] ?? 0;

/** Vorbereich •t: eingehende Kanten einer Transition */
export function preset(net: PetriNet, t: Id): Arc[] {
  return net.arcs.filter((a) => a.target === t);
}

/** Nachbereich t•: ausgehende Kanten einer Transition */
export function postset(net: PetriNet, t: Id): Arc[] {
  return net.arcs.filter((a) => a.source === t);
}

/** Schaltregel: t ist aktiviert, wenn jede Stelle im Vorbereich genug Marken hat
 *  und das Schalten keine Kapazität überschreitet. */
export function isEnabled(net: PetriNet, m: Marking, t: Id): boolean {
  const next = fireUnchecked(net, m, t);
  const hasTokens = preset(net, t).every((a) => tokens(m, a.source) >= a.weight);
  const withinCapacity = net.places.every(
    (p) => p.capacity === undefined || tokens(next, p.id) <= p.capacity,
  );
  return hasTokens && withinCapacity;
}

export function enabledTransitions(net: PetriNet, m: Marking): Id[] {
  return net.transitions.filter((t) => isEnabled(net, m, t.id)).map((t) => t.id);
}

function fireUnchecked(net: PetriNet, m: Marking, t: Id): Marking {
  const next: Marking = { ...m };
  for (const a of preset(net, t)) next[a.source] = tokens(next, a.source) - a.weight;
  for (const a of postset(net, t)) next[a.target] = tokens(next, a.target) + a.weight;
  return next;
}

/** Schaltet t in Markierung m und liefert die Folgemarkierung M' = M - •t + t•. */
export function fire(net: PetriNet, m: Marking, t: Id): Marking {
  if (!isEnabled(net, m, t)) {
    throw new Error(`Transition ${t} ist in der aktuellen Markierung nicht aktiviert.`);
  }
  return fireUnchecked(net, m, t);
}
