'use client';

import { useEffect } from 'react';

export default function NavScrollHandler() {
    useEffect(() => {
        const nav = document.querySelector('nav[role="banner"]');
        if (!nav) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
        };

        // Run once on mount
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return null;
}
