import { useEffect, useRef } from 'react';

export function useKeyboardControls() {
    const keys = useRef({
        forward: false,
        backward: false,
        left: false,
        right: false,
        space: false,
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            e.preventDefault(); // Prevent scrolling when driving
            switch (e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    keys.current.forward = true;
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    keys.current.backward = true;
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    keys.current.left = true;
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    keys.current.right = true;
                    break;
                case 'Space':
                    keys.current.space = true;
                    break;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    keys.current.forward = false;
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    keys.current.backward = false;
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    keys.current.left = false;
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    keys.current.right = false;
                    break;
                case 'Space':
                    keys.current.space = false;
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown, { passive: false });
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return keys;
}
