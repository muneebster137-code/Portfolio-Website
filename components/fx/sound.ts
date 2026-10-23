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
