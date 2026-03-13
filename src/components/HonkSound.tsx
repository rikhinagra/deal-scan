'use client';

import { useEffect, useRef } from 'react';

export default function HonkSound() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const roadScene = document.querySelector('.road-scene');
        if (!roadScene) return;

        // Muted autoplay is allowed by ALL browsers without any click.
        // Changing .muted does NOT require user interaction — this is the key trick.
        const io = new IntersectionObserver(
            (entries) => {
                audio.muted = !entries[0].isIntersecting;
            },
            { threshold: 0.1 }
        );

        io.observe(roadScene);
        return () => io.disconnect();
    }, []);

    return (
        <audio
            ref={audioRef}
            src="/honk.mp3"
            autoPlay
            muted
            loop
        />
    );
}
