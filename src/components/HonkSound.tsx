'use client';

import { useEffect, useRef } from 'react';

export default function HonkSound() {
    const audioRef   = useRef<HTMLAudioElement | null>(null);
    const playingRef = useRef(false);
    const visibleRef = useRef(false);
    const rafRef     = useRef<number>(0);

    useEffect(() => {
        const audio   = new Audio('/honk.mp3');
        audio.loop    = true;
        audio.volume  = 0.6;
        audio.preload = 'auto';
        audioRef.current = audio;

        const tryPlay = () => {
            if (playingRef.current || !visibleRef.current) return;
            playingRef.current = true;
            audio.play().catch(() => { playingRef.current = false; });
        };

        const tryStop = () => {
            if (!playingRef.current) return;
            playingRef.current = false;
            audio.pause();
            audio.currentTime = 0;
        };

        // IntersectionObserver — play when road scene is on screen, stop when not
        const roadScene = document.querySelector('.road-scene');
        let io: IntersectionObserver | null = null;

        if (roadScene) {
            io = new IntersectionObserver(
                (entries) => {
                    visibleRef.current = entries[0].isIntersecting;
                    if (entries[0].isIntersecting) tryPlay();
                    else tryStop();
                },
                { threshold: 0.1 }
            );
            io.observe(roadScene);
        }

        // RAF — also stop if section leaves during animation
        const tick = () => {
            if (!visibleRef.current) tryStop();
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafRef.current);
            io?.disconnect();
            tryStop();
            audio.src = '';
        };
    }, []);

    return null;
}
