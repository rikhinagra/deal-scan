'use client';

import { useEffect, useRef } from 'react';

export default function HonkSound() {
    const audioRef   = useRef<HTMLAudioElement | null>(null);
    const playingRef = useRef(false);
    const unlockedRef = useRef(false);
    const visibleRef = useRef(false);   // true = road-scene section is on screen
    const rafRef     = useRef<number>(0);

    useEffect(() => {
        const audio   = new Audio('/honk.mp3');
        audio.loop    = true;
        audio.volume  = 0.6;
        audio.preload = 'auto';
        audioRef.current = audio;

        // ── play / stop helpers ───────────────────────────────────────────────
        const tryPlay = () => {
            if (playingRef.current || !unlockedRef.current || !visibleRef.current) return;
            playingRef.current = true;
            audio.play().catch(() => {
                playingRef.current = false; // browser blocked — retry next tick
            });
        };

        const tryStop = () => {
            if (!playingRef.current) return;
            playingRef.current = false;
            audio.pause();
            audio.currentTime = 0;
        };

        // ── unlock audio on first user interaction ────────────────────────────
        // Chrome/Safari block audio until the user clicks, taps, or presses a key.
        const unlock = () => {
            if (unlockedRef.current) return;
            unlockedRef.current = true;
            // Try immediately in case section is already on screen
            if (visibleRef.current) tryPlay();
        };

        window.addEventListener('click',      unlock);
        window.addEventListener('keydown',    unlock);
        window.addEventListener('touchstart', unlock);

        // ── IntersectionObserver — start / stop when road scene enters view ───
        const roadScene = document.querySelector('.road-scene');
        let io: IntersectionObserver | null = null;

        if (roadScene) {
            io = new IntersectionObserver(
                (entries) => {
                    visibleRef.current = entries[0].isIntersecting;
                    if (!entries[0].isIntersecting) {
                        tryStop();
                    } else {
                        // Section just came into view — try to start if unlocked
                        tryPlay();
                    }
                },
                { threshold: 0.1 } // fire as soon as 10 % is visible
            );
            io.observe(roadScene);
        }

        // ── RAF loop — sync with "Drive It Home Today" tag opacity ────────────
        // Uses getComputedStyle (reliable) instead of getAnimations() (fragile).
        // The tagFloat animation fades opacity 0 → 1 → 0; when opacity > 0.5
        // the tag is clearly visible — that's when we honk.
        const tick = () => {
            if (visibleRef.current && unlockedRef.current) {
                const tag = document.querySelector<HTMLElement>('.drive-tag');
                if (tag) {
                    const opacity = parseFloat(getComputedStyle(tag).opacity);
                    if (opacity > 0.5) tryPlay();
                    else              tryStop();
                }
            } else {
                tryStop(); // section not on screen — always stop
            }
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        // ── cleanup ───────────────────────────────────────────────────────────
        return () => {
            cancelAnimationFrame(rafRef.current);
            io?.disconnect();
            window.removeEventListener('click',      unlock);
            window.removeEventListener('keydown',    unlock);
            window.removeEventListener('touchstart', unlock);
            tryStop();
            audio.src = '';
        };
    }, []);

    return null;
}
