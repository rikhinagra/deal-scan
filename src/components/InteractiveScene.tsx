'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { Environment, Plane } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import { Car } from './Car';

export default function InteractiveScene() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Avoid hydration mismatch on Canvas

    const PORSCHE_CURSOR = 'url("/transparent.png") 0 0, none';

    return (
        <div
            className="absolute inset-0 z-0 h-[100vh] w-full"
            style={{ position: 'absolute', top: 0, left: 0, cursor: PORSCHE_CURSOR }}
        >
            {/* Background container equivalent to the old video background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f7f4ee] to-[#e8e2d8]" />

            <Canvas
                shadows
                camera={{ position: [0, 8, 20], fov: 40 }}
                gl={{ preserveDrawingBuffer: true }}
                style={{ cursor: PORSCHE_CURSOR }}
                onCreated={({ gl }) => {
                    const canvas = gl.domElement;
                    canvas.style.setProperty('cursor', PORSCHE_CURSOR, 'important');
                    new MutationObserver(() => {
                        canvas.style.setProperty('cursor', PORSCHE_CURSOR, 'important');
                    }).observe(canvas, { attributes: true, attributeFilter: ['style'] });
                }}
            >
                <fog attach="fog" args={['#f7f4ee', 20, 60]} />
                <ambientLight intensity={1.5} />
                <directionalLight
                    position={[15, 20, 5]}
                    intensity={2.5}
                    castShadow
                    shadow-mapSize={2048}
                    shadow-camera-left={-20}
                    shadow-camera-right={20}
                    shadow-camera-top={20}
                    shadow-camera-bottom={-20}
                />

                <Suspense fallback={null}>
                    <Physics gravity={[0, -9.81, 0]}>
                        <RigidBody type="fixed" friction={1}>
                            {/* Floor */}
                            <Plane args={[200, 200]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                                <meshStandardMaterial color="#ddd7cc" roughness={0.9} />
                            </Plane>

                            {/* Invisible Boundaries to keep the car inside the view */}
                            <Plane args={[200, 50]} position={[0, 25, -20]} receiveShadow>
                                <meshBasicMaterial transparent opacity={0} />
                            </Plane>
                            <Plane args={[200, 50]} position={[0, 25, 20]} rotation={[0, Math.PI, 0]} receiveShadow>
                                <meshBasicMaterial transparent opacity={0} />
                            </Plane>
                            <Plane args={[200, 50]} position={[-30, 25, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                                <meshBasicMaterial transparent opacity={0} />
                            </Plane>
                            <Plane args={[200, 50]} position={[30, 25, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
                                <meshBasicMaterial transparent opacity={0} />
                            </Plane>
                        </RigidBody>

                        {/* The playable Porsche */}
                        <Car position={[0, 1, 0]} />

                        {/* Some physics blocks for fun to run over (Bruno Simon style) */}
                        {Array.from({ length: 15 }).map((_, i) => (
                            <RigidBody key={i} colliders="cuboid" position={[(Math.random() - 0.5) * 20, 2, (Math.random() - 0.5) * 15 - 5]} mass={1}>
                                {Math.random() > 0.5 ?
                                    <mesh castShadow receiveShadow>
                                        <boxGeometry args={[1, 1, 1]} />
                                        <meshStandardMaterial color={["#e84830", "#c8a84b", "#6b6560"][Math.floor(Math.random() * 3)]} />
                                    </mesh> :
                                    <mesh castShadow receiveShadow>
                                        <cylinderGeometry args={[0.5, 0.5, 1, 16]} />
                                        <meshStandardMaterial color="#ffffff" />
                                    </mesh>
                                }
                            </RigidBody>
                        ))}
                    </Physics>
                    <Environment preset="city" />
                </Suspense>
            </Canvas>

            {/* Mobile Controls Overlay */}
            <div className="absolute bottom-8 left-8 flex gap-2 sm:hidden z-50">
                <div className="flex flex-col gap-2">
                    <button className="w-12 h-12 bg-white/50 backdrop-blur rounded-full flex items-center justify-center active:bg-white/80"
                        onPointerDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' as any }))}
                        onPointerUp={() => window.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowUp' as any }))}>↑</button>
                    <button className="w-12 h-12 bg-white/50 backdrop-blur rounded-full flex items-center justify-center active:bg-white/80"
                        onPointerDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' as any }))}
                        onPointerUp={() => window.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowDown' as any }))}>↓</button>
                </div>
                <div className="flex gap-2 ml-12 items-end">
                    <button className="w-12 h-12 bg-white/50 backdrop-blur rounded-full flex items-center justify-center active:bg-white/80"
                        onPointerDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' as any }))}
                        onPointerUp={() => window.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowLeft' as any }))}>←</button>
                    <button className="w-12 h-12 bg-white/50 backdrop-blur rounded-full flex items-center justify-center active:bg-white/80"
                        onPointerDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' as any }))}
                        onPointerUp={() => window.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowRight' as any }))}>→</button>
                </div>
            </div>
        </div>
    );
}
