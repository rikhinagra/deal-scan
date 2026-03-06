'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, useRevoluteJoint, useFixedJoint, RapierRigidBody } from '@react-three/rapier';
import { Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { useKeyboardControls } from '@/hooks/useKeyboardControls';

const BLUE_PAINT = "#8abade"; // Matches the light blue Porsche in the reference image
const BLACK_PLASTIC = "#1a1a1a";

export function Car({ position = [0, 2, 0] }: { position?: [number, number, number] }) {
    const chassisRef = useRef<RapierRigidBody>(null);
    const controls = useKeyboardControls();

    // Basic implementation of car movement (applying forces to chassis for simplicity over complex wheel colliders for now)
    // For a true Bruno Simon style vehicle we'd use useRaycastVehicle, but a simple force-based RigidBody works nicely for a quick drivable prototype.
    useFrame((state, delta) => {
        if (!chassisRef.current) return;

        const { forward, backward, left, right } = controls.current;

        // Get current rotation to apply local forces
        const rotation = chassisRef.current.rotation();
        const euler = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w));

        const speed = 40;
        const turnSpeed = 2;

        // Acceleration
        if (forward) {
            const dir = new THREE.Vector3(0, 0, -1).applyEuler(euler).multiplyScalar(speed * delta);
            chassisRef.current.applyImpulse(dir, true);
        }
        if (backward) {
            const dir = new THREE.Vector3(0, 0, 1).applyEuler(euler).multiplyScalar(speed * delta * 0.5); // Reverse is slower
            chassisRef.current.applyImpulse(dir, true);
        }

        // Steering (torque)
        if (left && (forward || backward)) {
            chassisRef.current.applyTorqueImpulse({ x: 0, y: turnSpeed * delta * (backward ? -1 : 1), z: 0 }, true);
        }
        if (right && (forward || backward)) {
            chassisRef.current.applyTorqueImpulse({ x: 0, y: -turnSpeed * delta * (backward ? -1 : 1), z: 0 }, true);
        }

        // Dampening to simulate friction and stop the car
        const linVel = chassisRef.current.linvel();
        chassisRef.current.setLinvel({ x: linVel.x * 0.95, y: linVel.y, z: linVel.z * 0.95 }, true);
        const angVel = chassisRef.current.angvel();
        chassisRef.current.setAngvel({ x: angVel.x * 0.9, y: angVel.y * 0.9, z: angVel.z * 0.9 }, true);

        // Dynamic Camera Follow
        const carPosition = chassisRef.current.translation();
        const targetPos = new THREE.Vector3(carPosition.x, carPosition.y + 8, carPosition.z + 18);
        state.camera.position.lerp(targetPos, 0.05);
        state.camera.lookAt(carPosition.x, carPosition.y, carPosition.z);
    });

    return (
        <RigidBody ref={chassisRef} position={position} mass={150} colliders="cuboid" linearDamping={1} angularDamping={2}>
            <group>
                {/* Main Body */}
                <Box args={[1.8, 0.5, 4]} position={[0, 0.4, 0]} castShadow>
                    <meshStandardMaterial color={BLUE_PAINT} roughness={0.4} />
                </Box>
                {/* Cabin (Porsche curve) */}
                <Box args={[1.4, 0.6, 1.8]} position={[0, 0.9, -0.2]} castShadow>
                    <meshStandardMaterial color={BLACK_PLASTIC} roughness={0.1} />
                </Box>
                {/* Front Bumper / Splitter */}
                <Box args={[1.9, 0.1, 0.4]} position={[0, 0.15, -2]} castShadow>
                    <meshStandardMaterial color={BLACK_PLASTIC} />
                </Box>
                {/* Giant Rear Wing (Manthey Racing style) */}
                <Box args={[2, 0.05, 0.4]} position={[0, 1.3, 1.6]} castShadow>
                    <meshStandardMaterial color={BLACK_PLASTIC} />
                </Box>
                <Box args={[0.05, 0.4, 0.2]} position={[-0.6, 1.1, 1.6]} castShadow>
                    <meshStandardMaterial color={BLACK_PLASTIC} />
                </Box>
                <Box args={[0.05, 0.4, 0.2]} position={[0.6, 1.1, 1.6]} castShadow>
                    <meshStandardMaterial color={BLACK_PLASTIC} />
                </Box>

                {/* Fake Wheels for visuals since we use a floating physics box */}
                <Wheel position={[-1, 0.3, -1.2]} />
                <Wheel position={[1, 0.3, -1.2]} />
                <Wheel position={[-1, 0.3, 1.4]} />
                <Wheel position={[1, 0.3, 1.4]} />
            </group>
        </RigidBody>
    );
}

function Wheel({ position }: { position: [number, number, number] }) {
    return (
        <group position={position} rotation={[0, 0, Math.PI / 2]}>
            <Cylinder args={[0.35, 0.35, 0.25, 16]} castShadow>
                <meshStandardMaterial color="#111" roughness={0.9} />
            </Cylinder>
            {/* Rim */}
            <Cylinder args={[0.25, 0.25, 0.26, 16]}>
                <meshStandardMaterial color="#ccc" metalness={0.8} roughness={0.2} />
            </Cylinder>
        </group>
    );
}
