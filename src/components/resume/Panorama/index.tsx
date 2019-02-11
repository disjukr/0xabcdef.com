import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import * as THREE from 'three';

import { useSize, useRaf } from '../../../util';
import * as styles from './index.module.scss';

interface Props {
    className?: string;
    image: string;
    patrol: (now: number) => Rotation;
}

const Panorama: React.FC<Props> = ({ className, image }) => {
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
    useEffect(() => {
        if (!world) return;
        const material = world!.mesh.material as THREE.MeshBasicMaterial;
        material.setValues({ map: new THREE.TextureLoader().load(
            require('../../../images/' + image)
        ) });
    }, [image, world]);
    const animate = useMemo(
        () => (_: any, now: number) => {
            if (!world) return;
            const t = now / 1000;
            world.mesh.rotation.y = Math.cos(t) / 2 - Math.PI / 2;
            world.mesh.rotation.x = Math.sin(t) / 2 - Math.PI / 8;
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
        const ratio = size.width / size.height;
        this.camera = new THREE.PerspectiveCamera(30, ratio, 0.1, 100);
        this.camera.position.z = 1;
        this.scene = new THREE.Scene();
        const geometry = new THREE.SphereGeometry(50, 60, 40);
        geometry.scale(-1, 1, 1);
        const material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(
                require('../../../images/PANO_20140116_155642.jpg')
            ),
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

interface Rotation {
    x: number;
    y: number;
}
