"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function RobotModel() {
    const groupRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Bone | null>(null);
    const leftArmRef = useRef<THREE.Bone | null>(null);
    const rightArmRef = useRef<THREE.Bone | null>(null);
    const spineRef = useRef<THREE.Bone | null>(null);

    // State to control animation playback
    const [isAnimating, setIsAnimating] = useState(false);

    // Use refs for animation variables to avoid re-renders
    const mousePos = useRef({ x: 0, y: 0 });
    const smoothMousePos = useRef({ x: 0, y: 0 });
    const timeRef = useRef(0);

    // Load the GLTF model
    const gltf = useLoader(GLTFLoader, "/robot_no.1_-_rigged_-_animated/scene.gltf");

    // Setup animations
    const { actions, names } = useAnimations(gltf.animations, groupRef);

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mousePos.current = {
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1,
            };
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Play animations when clicked
    useEffect(() => {
        console.log("Available animations:", names);
        if (isAnimating && names.length > 0) {
            // Play all animations
            names.forEach((name) => {
                const action = actions[name];
                if (action) {
                    action.reset().play();
                    action.setLoop(THREE.LoopRepeat, Infinity);
                }
            });
        } else {
            // Stop all animations
            names.forEach((name) => {
                const action = actions[name];
                if (action) {
                    action.stop();
                }
            });
        }
    }, [isAnimating, actions, names]);

    // Find the bones on mount
    useEffect(() => {
        if (gltf.scene) {
            // Log all bone names to help identify the correct structure
            const allBones: string[] = [];
            gltf.scene.traverse((child) => {
                if (child instanceof THREE.Bone) {
                    allBones.push(child.name);
                }
            });
            console.log("Available bones in robot model:", allBones);

            // Priority order: look for main head/neck bones first
            // "Bone_01" seemed to be a root or major bone in the grep search
            const priorityBoneNames = [
                "head",
                "neck",
                "Bone_01", // Likely the root or main body bone based on GLTF inspection
                "Bone.001",
                "mixamorigHead",
            ];

            // Re-initialize bone refs
            headRef.current = null;
            spineRef.current = null;
            leftArmRef.current = null;
            rightArmRef.current = null;

            // First pass: try to find priority bones for the "head" (or main tracking bone)
            for (const targetName of priorityBoneNames) {
                gltf.scene.traverse((child) => {
                    if (!headRef.current && child instanceof THREE.Bone) {
                        if (child.name.toLowerCase().includes(targetName.toLowerCase())) {
                            console.log("Found head tracking bone:", child.name);
                            headRef.current = child;
                        }
                    }
                });
                if (headRef.current) break;
            }

            // Find spine/torso bone for body rotation - fallback to generic Bones if needed
            gltf.scene.traverse((child) => {
                if (child instanceof THREE.Bone) {
                    const boneName = child.name.toLowerCase();
                    if (!spineRef.current && (boneName.includes("spine") || boneName.includes("torso") || boneName.includes("chest") || boneName === "bone.002_04")) {
                        // Added "bone.002_04" as a guess based on the sequence seen in grep
                        spineRef.current = child;
                    }
                }
            });

            // Find arm bones - simplistic check for left/right
            gltf.scene.traverse((child) => {
                if (child instanceof THREE.Bone) {
                    const boneName = child.name.toLowerCase();
                    if (boneName.includes("shoulder") || boneName.includes("arm") || boneName.includes("hand")) {
                        if (boneName.includes("left") || boneName.includes("_l") || boneName.includes("l_")) {
                            if (!leftArmRef.current) leftArmRef.current = child;
                        } else if (boneName.includes("right") || boneName.includes("_r") || boneName.includes("r_")) {
                            if (!rightArmRef.current) rightArmRef.current = child;
                        }
                    }
                }
            });
        }
    }, [gltf]);

    // Animate with smooth interpolation and idle animations
    useFrame((state, delta) => {
        timeRef.current += delta;

        // Smooth mouse position logic inside useFrame (no re-renders)
        const lerpSpeed = 0.15; // Increased from 0.08 for faster response
        smoothMousePos.current.x = THREE.MathUtils.lerp(smoothMousePos.current.x, mousePos.current.x, lerpSpeed);
        smoothMousePos.current.y = THREE.MathUtils.lerp(smoothMousePos.current.y, mousePos.current.y, lerpSpeed);

        const sx = smoothMousePos.current.x;
        const sy = smoothMousePos.current.y;

        // Subtle idle animations
        const breathingOffset = Math.sin(timeRef.current * 1.5) * 0.02;
        const idleSwayX = Math.sin(timeRef.current * 0.8) * 0.05;
        const idleSwayY = Math.cos(timeRef.current * 0.6) * 0.03;

        // Animate head
        if (headRef.current) {
            const targetRotationY = sx * 0.5 + idleSwayX;
            const targetRotationX = sy * 0.35 + idleSwayY;
            const baseRotationX = 0;

            headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotationY, 0.25); // Increased from 0.15
            headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, baseRotationX + targetRotationX, 0.25); // Increased from 0.15
            headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, -sx * 0.1, 0.15); // Increased from 0.1
        }

        // Animate body (spinal tilt)
        if (spineRef.current) {
            spineRef.current.rotation.y = THREE.MathUtils.lerp(spineRef.current.rotation.y, sx * 0.15, 0.08);
            spineRef.current.rotation.x = THREE.MathUtils.lerp(spineRef.current.rotation.x, sy * 0.1 + breathingOffset, 0.08);
        }

        // Reactive arms
        if (leftArmRef.current) {
            const baseZ = Math.PI / 3;
            leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, baseZ + sx * 0.2 + breathingOffset, 0.1);
        }

        if (rightArmRef.current) {
            const baseZ = -Math.PI / 3;
            rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, baseZ + sx * 0.2 - breathingOffset, 0.1);
        }

        // Whole group movement / Parallax
        if (groupRef.current) {
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, sx * 0.08, 0.05);
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, sx * 0.3, 0.05);
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -0.5 + sy * 0.2, 0.05);
        }
    });

    return (
        <group ref={groupRef}>
            <primitive
                object={gltf.scene}
                scale={1.0}
                position={[0, -0.5, 0]}
                rotation={[-Math.PI / 4, Math.PI, 0]}
                onClick={(e: THREE.Event) => {
                    setIsAnimating(!isAnimating);
                }}
            />
        </group>
    );
}
