'use client';

import { useEffect, useRef } from 'react';

/** Must match `animation: carDrive 7s linear infinite` on `.road-car-wrap` */
const CAR_CYCLE_MS = 7000;
/** Same timing as prototype / when honk UI appears (~58% of lap) */
const HONK_OFFSET_MS = CAR_CYCLE_MS * 0.58;
const DOUBLE_HONK_GAP_MS = 280;
const CAR_ANIMATION_NAME = 'carDrive';

/** Throttle for wheel-driven resume attempts (best-effort, low overhead) */
const WHEEL_TRY_MS = 220;

function playHonk(audioCtx: AudioContext) {
  try {
    const honkFreqs = [440, 550];
    honkFreqs.forEach((freq, i) => {
      const t0 = audioCtx.currentTime + i * 0.04;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t0);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.96, audioCtx.currentTime + 0.22 + i * 0.04);
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.02 + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35 + i * 0.04);
      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.value = 28;
      lfoGain.gain.value = 8;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start(t0);
      lfo.stop(audioCtx.currentTime + 0.4 + i * 0.04);
      osc.start(t0);
      osc.stop(audioCtx.currentTime + 0.4 + i * 0.04);
    });
  } catch {
    /* ignore */
  }
}

function getCarAnimationPhaseMs(car: HTMLElement): number | null {
  const anims = car.getAnimations?.();
  if (!anims?.length) return null;
  for (const anim of anims) {
    const name = (anim as unknown as { animationName?: string }).animationName;
    if (name !== CAR_ANIMATION_NAME) continue;
    const ct = anim.currentTime;
    if (ct == null) return null;
    const num = Number(ct);
    if (!Number.isFinite(num)) return null;
    return num % CAR_CYCLE_MS;
  }
  return null;
}

/** Where we are inside the 7s lap (ms). Returns delays until next honk(s) from “now”. */
function honkPairDelaysFromPhase(phaseMs: number): { first: number; includeDouble: boolean } {
  if (phaseMs < HONK_OFFSET_MS) {
    return { first: HONK_OFFSET_MS - phaseMs, includeDouble: true };
  }
  if (phaseMs < HONK_OFFSET_MS + DOUBLE_HONK_GAP_MS) {
    return { first: HONK_OFFSET_MS + DOUBLE_HONK_GAP_MS - phaseMs, includeDouble: false };
  }
  return {
    first: CAR_CYCLE_MS - phaseMs + HONK_OFFSET_MS,
    includeDouble: true,
  };
}

export default function HonkSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const unlockedRef = useRef(false);
  const roadVisibleRef = useRef(false);
  const pendingTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reducedMotionRef = useRef(false);
  const lastWheelTryRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const updateReduced = () => {
      reducedMotionRef.current = !!mq?.matches;
    };
    updateReduced();
    mq?.addEventListener('change', updateReduced);

    const clearPendingHonks = () => {
      pendingTimeoutsRef.current.forEach(clearTimeout);
      pendingTimeoutsRef.current = [];
    };

    const getAudioContext = (): AudioContext | null => {
      if (audioCtxRef.current) return audioCtxRef.current;
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      audioCtxRef.current = new Ctor();
      return audioCtxRef.current;
    };

    const scheduleFromCssPhase = () => {
      clearPendingHonks();
      if (
        !unlockedRef.current ||
        !roadVisibleRef.current ||
        reducedMotionRef.current ||
        document.visibilityState !== 'visible'
      ) {
        return;
      }
      const ctx = audioCtxRef.current;
      if (!ctx || ctx.state !== 'running') return;

      const roadCar = document.querySelector('.road-car-wrap');
      if (!(roadCar instanceof HTMLElement)) return;

      const phase = getCarAnimationPhaseMs(roadCar);
      const { first, includeDouble } =
        phase == null
          ? { first: HONK_OFFSET_MS, includeDouble: true }
          : honkPairDelaysFromPhase(phase);

      const push = (fn: () => void, ms: number) => {
        pendingTimeoutsRef.current.push(setTimeout(fn, ms));
      };

      push(() => playHonk(ctx), first);
      if (includeDouble) {
        push(() => playHonk(ctx), first + DOUBLE_HONK_GAP_MS);
      }
    };

    /**
     * Resume audio + schedule honks when allowed.
     * Called when the road enters view (scroll), on touch/wheel (often tied to scrolling), or on click/key.
     * Browsers may keep AudioContext suspended until there has been user activation; we retry safely.
     */
    const tryStartAudio = async () => {
      if (reducedMotionRef.current) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      if (unlockedRef.current && ctx.state === 'running') {
        if (roadVisibleRef.current) scheduleFromCssPhase();
        return;
      }

      try {
        await ctx.resume();
      } catch {
        return;
      }

      if (ctx.state === 'running') {
        unlockedRef.current = true;
        if (roadVisibleRef.current) scheduleFromCssPhase();
      }
    };

    const onActivationGesture = () => {
      void tryStartAudio();
    };

    document.addEventListener('pointerdown', onActivationGesture, { passive: true });
    document.addEventListener('keydown', onActivationGesture);
    document.addEventListener('touchstart', onActivationGesture, { passive: true, capture: true });

    const onWheelMaybeScroll = () => {
      if (!roadVisibleRef.current) return;
      const now = performance.now();
      if (now - lastWheelTryRef.current < WHEEL_TRY_MS) return;
      lastWheelTryRef.current = now;
      void tryStartAudio();
    };
    window.addEventListener('wheel', onWheelMaybeScroll, { passive: true });

    const roadScene = document.querySelector('.road-scene');
    const roadCar = document.querySelector('.road-car-wrap');

    const roadIo = new IntersectionObserver(
      (entries) => {
        const vis = entries[0]?.isIntersecting ?? false;
        roadVisibleRef.current = vis;
        if (vis) {
          void tryStartAudio();
        } else {
          clearPendingHonks();
        }
      },
      { threshold: 0.12 }
    );
    if (roadScene) roadIo.observe(roadScene);

    const onCarAnimationIteration = (ev: AnimationEvent) => {
      if (ev.animationName !== CAR_ANIMATION_NAME) return;
      scheduleFromCssPhase();
    };

    if (roadCar) {
      roadCar.addEventListener('animationiteration', onCarAnimationIteration as EventListener);
    }

    const onVisibility = () => {
      if (document.visibilityState !== 'visible') clearPendingHonks();
      else if (unlockedRef.current && roadVisibleRef.current) void tryStartAudio();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      mq?.removeEventListener('change', updateReduced);
      document.removeEventListener('pointerdown', onActivationGesture);
      document.removeEventListener('keydown', onActivationGesture);
      document.removeEventListener('touchstart', onActivationGesture, { capture: true });
      window.removeEventListener('wheel', onWheelMaybeScroll);
      roadIo.disconnect();
      if (roadCar) {
        roadCar.removeEventListener('animationiteration', onCarAnimationIteration as EventListener);
      }
      document.removeEventListener('visibilitychange', onVisibility);
      clearPendingHonks();
    };
  }, []);

  return null;
}
