"use client";

// Sound is off until the visitor turns it on. Everything is synthesised (no audio files): a paper rustle
// for the page turn and a soft tone for each object on the services shelf.

let ctx: AudioContext | null = null;
let enabled = false;
const listeners = new Set<(on: boolean) => void>();

export const isSoundOn = () => enabled;

export function setSound(on: boolean) {
  enabled = on;
  if (on) {
    ctx ??= new AudioContext();
    void ctx.resume();
  }
  listeners.forEach((l) => l(on));
}

export function onSoundChange(l: (on: boolean) => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

// A page turning: a short burst of filtered noise that sweeps up, like paper sliding over paper.
export function rustle() {
  if (!enabled || !ctx) return;
  const t = ctx.currentTime;
  const len = 0.55;
  const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * len), ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (0.6 + 0.4 * Math.random());
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.Q.value = 0.8;
  band.frequency.setValueAtTime(1400, t);
  band.frequency.exponentialRampToValueAtTime(4200, t + len);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.22, t + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.001, t + len);
  src.connect(band).connect(gain).connect(ctx.destination);
  src.start(t);
}

// One note of a pentatonic scale per shelf object, soft attack, long tail.
const SCALE = [392, 440, 523.25, 587.33, 659.25, 783.99, 880];
export function tone(i: number) {
  if (!enabled || !ctx) return;
  const t = ctx.currentTime;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.07, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0008, t + 1.4);
  gain.connect(ctx.destination);
  [1, 2].forEach((h, k) => {
    const o = ctx!.createOscillator();
    o.type = k ? "triangle" : "sine";
    o.frequency.value = SCALE[((i % 7) + 7) % 7] * h;
    const g = ctx!.createGain();
    g.gain.value = k ? 0.25 : 1;
    o.connect(g).connect(gain);
    o.start(t);
    o.stop(t + 1.5);
  });
}

// Graphite on paper: one looping, grainy noise that is only heard while the pencil is moving. Each call
// sets the loudness from how fast the line is being drawn (px of line per second); if the calls stop,
// it fades out by itself a moment later.
let scratch: GainNode | null = null;
function scratchVoice(c: AudioContext) {
  if (scratch) return scratch;
  const buf = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
  const d = buf.getChannelData(0);
  let grain = 0;
  for (let i = 0; i < d.length; i++) {
    // Paper tooth: steady hiss with little catches where the point skips over a fibre.
    if (Math.random() < 0.002) grain = 1;
    grain *= 0.996;
    d[i] = (Math.random() * 2 - 1) * (0.35 + grain * 0.9);
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const high = c.createBiquadFilter();
  high.type = "highpass";
  high.frequency.value = 1800;
  const band = c.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 4200;
  band.Q.value = 0.6;
  scratch = c.createGain();
  scratch.gain.value = 0;
  src.connect(high).connect(band).connect(scratch).connect(c.destination);
  src.start();
  return scratch;
}

export function pencil(speed: number) {
  if (!enabled || !ctx) return;
  const g = scratchVoice(ctx);
  const t = ctx.currentTime;
  const level = Math.min(1, speed / 1400) * 0.16;
  g.gain.cancelScheduledValues(t);
  g.gain.setTargetAtTime(level, t, 0.025);
  g.gain.setTargetAtTime(0, t + 0.12, 0.05);
}

// The horn: two low, detuned saws through a closing filter. Played once, on the kick that wakes you up.
export function braam() {
  if (!enabled || !ctx) return;
  const t = ctx.currentTime;
  const out = ctx.createGain();
  out.gain.setValueAtTime(0, t);
  out.gain.linearRampToValueAtTime(0.14, t + 0.06);
  out.gain.setTargetAtTime(0, t + 0.7, 0.35);
  const low = ctx.createBiquadFilter();
  low.type = "lowpass";
  low.frequency.setValueAtTime(900, t);
  low.frequency.exponentialRampToValueAtTime(180, t + 1.8);
  low.connect(out).connect(ctx.destination);
  [43.65, 44.2, 87.3].forEach((f) => {
    const o = ctx!.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = f;
    o.connect(low);
    o.start(t);
    o.stop(t + 2.6);
  });
}

// Going a level deeper: a soft note that slides down.
export function deeper(level: number) {
  if (!enabled || !ctx) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(330 / level, t);
  o.frequency.exponentialRampToValueAtTime(165 / level, t + 1.2);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.08, t + 0.05);
  g.gain.exponentialRampToValueAtTime(0.0008, t + 1.6);
  o.connect(g).connect(ctx.destination);
  o.start(t);
  o.stop(t + 1.7);
}

// While time is slowed: a low, slowly pulsing drone that fades in and out with the hold.
let droneGain: GainNode | null = null;
export function drone(on: boolean) {
  if (!ctx) return;
  if (!droneGain) {
    droneGain = ctx.createGain();
    droneGain.gain.value = 0;
    const low = ctx.createBiquadFilter();
    low.type = "lowpass";
    low.frequency.value = 260;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.35;
    const depth = ctx.createGain();
    depth.gain.value = 120;
    lfo.connect(depth).connect(low.frequency);
    [55, 55.6, 82.4].forEach((f) => {
      const o = ctx!.createOscillator();
      o.type = "triangle";
      o.frequency.value = f;
      o.connect(low);
      o.start();
    });
    lfo.start();
    low.connect(droneGain).connect(ctx.destination);
  }
  const t = ctx.currentTime;
  droneGain.gain.cancelScheduledValues(t);
  droneGain.gain.setTargetAtTime(on && enabled ? 0.12 : 0, t, on ? 0.4 : 0.25);
}
