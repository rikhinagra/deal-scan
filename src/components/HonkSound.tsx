'use client';

import { useEffect, useRef } from 'react';

export default function HonkSound() {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const roadScene = document.querySelector('.road-scene');
        if (!roadScene) return;

        // <video autoplay muted> is guaranteed to autoplay in ALL browsers.
        // Toggling .muted does NOT require any user interaction.
        // So: muted always → unmute only when road scene is on screen.
        const io = new IntersectionObserver(
            (entries) => {
                video.muted = !entries[0].isIntersecting;
            },
            { threshold: 0.1 }
        );

        io.observe(roadScene);
        return () => io.disconnect();
    }, []);

    return (
        <video
            ref={videoRef}
            src="/honk.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ display: 'none' }}
        />
    );
}
