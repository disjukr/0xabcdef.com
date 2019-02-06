import React, { useState, useEffect, useRef, useMemo } from 'react';
import classNames from 'classnames';
import * as THREE from 'three';

import { useSize, useRaf } from '../../../util';
import * as styles from './index.module.scss';

interface Props {
    className?: string;
}

const Panorama: React.FC<Props> = ({ className }) => {
    const container = useRef<HTMLDivElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const size = useSize(container);
    const [world, setWorld] = useState<World | null>(null);
    useEffect(() => {
        if (!size) return;
        if (!world) return setWorld(new World(size, canvas.current!));
        world.renderer.setSize(size.width, size.height);
        world.camera.aspect = size.width / size.height;
        world.camera.updateProjectionMatrix();
    }, [size, world]);
    const animate = useMemo(
        () => () => {
            if (!world) return;
            world.mesh.rotation.x += 0.01;
            world.mesh.rotation.y += 0.02;
            world.renderer.render(world.scene, world.camera);
        },
        [world]
    );
    useRaf(animate);
    return (
        <div className={classNames(styles.panorama, className)} ref={container}>
            <canvas ref={canvas} width={0} height={0} />
        </div>
    );
};

export default Panorama;

class World {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    mesh: THREE.Mesh;
    renderer: THREE.WebGLRenderer;
    constructor(public size: { width: number; height: number }, public canvas: HTMLCanvasElement) {
        // TODO: implement panorama
        const ratio = size.width / size.height;
        this.camera = new THREE.PerspectiveCamera(70, ratio, 0.01, 10);
        this.camera.position.z = 1;
        this.scene = new THREE.Scene();
        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
