import { describe, expect, it } from 'vitest';
import { enabledTransitions, fire, isEnabled } from './petriNet';
import { producerConsumer as net } from './examples';

describe('Schaltregel', () => {
  it('aktiviert anfangs nur "erzeugen"', () => {
    expect(enabledTransitions(net, net.initialMarking)).toEqual(['t_produce']);
  });

  it('berechnet die Folgemarkierung', () => {
    const m1 = fire(net, net.initialMarking, 't_produce');
    expect(m1).toEqual({ p_ready: 1, p_idle: 1, p_buffer: 1 });
    expect(isEnabled(net, m1, 't_consume')).toBe(true);
  });

  it('respektiert die Kapazität des Puffers', () => {
    let m = net.initialMarking;
    for (let i = 0; i < 3; i++) m = fire(net, m, 't_produce');
    expect(isEnabled(net, m, 't_produce')).toBe(false);
    expect(() => fire(net, m, 't_produce')).toThrow();
  });
});
