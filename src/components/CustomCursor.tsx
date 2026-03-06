'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // Use a real transparent PNG FILE (not data URI) as the cursor
        // File-based cursors work more reliably across browsers than data URIs
        const TRANSPARENT = 'url("/transparent.png") 0 0, none';

        if (!document.getElementById('cursor-hider')) {
            const style = document.createElement('style');
            style.id = 'cursor-hider';
            style.innerHTML = `html, body, *, *::before, *::after { cursor: ${TRANSPARENT} !important; }`;
            document.head.appendChild(style);
        }

        // Track the mouse with the .webp image
        const handleMouseMove = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <img
            draggable={false}
            ref={cursorRef}
            src="/porsche-911.webp"
            alt=""
            className="pointer-events-none select-none touch-none fixed z-[9999] drop-shadow-lg"
            style={{
                left: 0,
                top: 0,
                width: '120px',
                height: 'auto',
                transform: 'translate(-100vw, -100vh)',
                willChange: 'transform',
            }}
        />
    );
}
