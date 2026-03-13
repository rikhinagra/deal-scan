'use client';

import { useEffect, useRef, useState } from 'react';

export default function HonkSound() {
    const audioRef    = useRef<HTMLAudioElement | null>(null);
    const playingRef  = useRef(false);
    const unlockedRef = useRef(false);
    const visibleRef  = useRef(false);
    const rafRef      = useRef<number>(0);
    const [showBtn, setShowBtn]   = useState(false);
    const [muted,   setMuted]     = useState(false);

    useEffect(() => {
        const audio   = new Audio('/honk.mp3');
        audio.loop    = true;
        audio.volume  = 0.6;
        audio.preload = 'auto';
        audioRef.current = audio;

        const tryPlay = () => {
            if (playingRef.current || !unlockedRef.current || !visibleRef.current) return;
            playingRef.current = true;
            audio.play().catch(() => {
                playingRef.current = false;
            });
        };

        const tryStop = () => {
            if (!playingRef.current) return;
            playingRef.current = false;
            audio.pause();
            audio.currentTime = 0;
        };

        // Unlock on real user gesture (click / tap / key) — NOT scroll
        const unlock = () => {
            if (unlockedRef.current) return;
            unlockedRef.current = true;
            setShowBtn(false);
            if (visibleRef.current) tryPlay();
        };

        window.addEventListener('click',      unlock);
        window.addEventListener('keydown',    unlock);
        window.addEventListener('touchstart', unlock);

        // Show the mute button after 2 s if user hasn't interacted yet
        const btnTimer = setTimeout(() => {
            if (!unlockedRef.current) setShowBtn(true);
        }, 2000);

        // IntersectionObserver — play when road scene enters viewport
        const roadScene = document.querySelector('.road-scene');
        let io: IntersectionObserver | null = null;

        if (roadScene) {
            io = new IntersectionObserver(
                (entries) => {
                    visibleRef.current = entries[0].isIntersecting;
                    if (!entries[0].isIntersecting) {
                        tryStop();
                    } else {
                        tryPlay();
                    }
                },
                { threshold: 0.1 }
            );
            io.observe(roadScene);
        }

        // RAF — sync honk with "Drive It Home Today" tag visibility
        const tick = () => {
            if (visibleRef.current && unlockedRef.current) {
                const tag = document.querySelector<HTMLElement>('.drive-tag');
                if (tag) {
                    const opacity = parseFloat(getComputedStyle(tag).opacity);
                    if (opacity > 0.5) tryPlay();
                    else              tryStop();
                }
            } else {
                tryStop();
            }
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            clearTimeout(btnTimer);
            cancelAnimationFrame(rafRef.current);
            io?.disconnect();
            window.removeEventListener('click',      unlock);
            window.removeEventListener('keydown',    unlock);
            window.removeEventListener('touchstart', unlock);
            tryStop();
            audio.src = '';
        };
    }, []);

    // Button click — this IS a real user gesture, so play() will work
    const handleBtn = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (muted) {
            // Unmute
            setMuted(false);
            unlockedRef.current = true;
            if (visibleRef.current && !playingRef.current) {
                playingRef.current = true;
                audio.play().catch(() => { playingRef.current = false; });
            }
        } else {
            // Mute / unlock first time
            unlockedRef.current = true;
            setShowBtn(false);
            if (visibleRef.current && !playingRef.current) {
                playingRef.current = true;
                audio.play().catch(() => { playingRef.current = false; });
            }
        }
    };

    if (!showBtn) return null;

    return (
        <button
            onClick={handleBtn}
            title={muted ? 'Enable horn sound' : 'Enable horn sound'}
            style={{
                position:       'fixed',
                bottom:         '28px',
                right:          '28px',
                width:          '44px',
                height:         '44px',
                borderRadius:   '50%',
                background:     'rgba(20,20,20,0.82)',
                border:         '1px solid rgba(255,255,255,0.15)',
                color:          '#fff',
                fontSize:       '20px',
                cursor:         'pointer',
                zIndex:         9999,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                backdropFilter: 'blur(6px)',
                boxShadow:      '0 2px 12px rgba(0,0,0,0.4)',
            }}
            aria-label="Enable horn sound"
        >
            🔇
        </button>
    );
}
