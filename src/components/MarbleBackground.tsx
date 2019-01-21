import React, { useEffect, useRef } from 'react';
import { ContextValue } from 'join-react-context';

import { arr0, useSubscribe, useAnimationFrameLoop } from '../util';
import { layoutContext } from './Layout';

interface Props {
    className?: string;
}
export default ({ className }: Props) => {
    const canvas = useRef(null as any);
    const [layoutState, emitter] = useSubscribe(layoutContext);
    const width = layoutState.width / 2;
    const height = layoutState.height / 2;
    useAnimationFrameLoop(emitter, 50);
    useEffect(() => {
        // babel에서 typeof import 지원이 안되는 듯 하다...
        // 개발활때만 주석 풀고 작업해야함 ㅠㅠㅠ
        // const PIXI: typeof import('pixi.js') = require('pixi.js');
        const PIXI = require('pixi.js');
        class Circle extends PIXI.Graphics {
            constructor(
                public x: number,
                public y: number,
                public dx: number,
                public dy: number,
                public size: number,
                public color: number
            ) {
                super();
                this.blendMode = PIXI.BLEND_MODES.ADD;
                if (size > 0) {
                    this.beginFill(color);
                    this.drawCircle(0, 0, size);
                    this.endFill();
                }
            }
            move(container: PIXI.Container, stageWidth: number, stageHeight: number) {
                this.x += this.dx;
                this.y += this.dy;
                if (
                    this.x < -this.size ||
                    this.x > stageWidth + this.size ||
                    this.y < -this.size ||
                    this.y > stageHeight + this.size
                ) {
                    container.removeChild(this);
                }
            }
            static gen(stageWidth: number, stageHeight: number, pow: number) {
                const size = pow * (Math.max(stageWidth, stageHeight) / 5);
                const spd = size * 0.1 + 5;
                const angle = Math.random() * Math.PI * 2;
                return new Circle(
                    stageWidth / 2,
                    stageHeight / 2,
                    Math.cos(angle) * spd,
                    Math.sin(angle) * spd,
                    size,
                    (Math.random() * 0xffffff) & 0x333333
                );
            }
        }
        class ColorTransformFilter extends PIXI.filters.ColorMatrixFilter {
            constructor(
                redMultiplier = 1,
                greenMultiplier = 1,
                blueMultiplier = 1,
                alphaMultiplier = 1,
                redOffset = 0,
                greenOffset = 0,
                blueOffset = 0,
                alphaOffset = 0
            ) {
                super();
                this.matrix = [
                    redMultiplier,
                    0,
                    0,
                    0,
                    redOffset / 255,
                    0,
                    greenMultiplier,
                    0,
                    0,
                    greenOffset / 255,
                    0,
                    0,
                    blueMultiplier,
                    0,
                    blueOffset / 255,
                    0,
                    0,
                    0,
                    alphaMultiplier,
                    alphaOffset / 255,
                ];
            }
        }
        let width = layoutState.width / 2;
        let height = layoutState.height / 2;
        const container = new PIXI.Container();
        const circles = new PIXI.Container();
        const offset = 50;
        const cameraMatrix = new PIXI.Matrix();
        cameraMatrix.translate(offset, offset);
        const rt1 = PIXI.RenderTexture.create(width + offset * 2, height + offset * 2);
        const rt2 = PIXI.RenderTexture.create(width + offset * 2, height + offset * 2);
        const rts1 = new PIXI.Sprite(rt1);
        rts1.x = -offset;
        rts1.y = -offset;
        const rts2 = new PIXI.Sprite(rt2);
        rts2.x = -offset;
        rts2.y = -offset;
        const df = new PIXI.filters.DisplacementFilter(rts2);
        const f = 0.9;
        const cf = new ColorTransformFilter(f, f, f);
        rts1.filters = [df, cf];
        container.addChild(circles, rts1);
        let a = 0;
        const renderer = PIXI.autoDetectRenderer(width, height, {
            view: canvas.current,
        });
        emitter.on('update', (layoutState: ContextValue<typeof layoutContext>) => {
            width = layoutState.width / 2;
            height = layoutState.height / 2;
            rt1.resize(width + offset * 2, height + offset * 2);
            rt2.resize(width + offset * 2, height + offset * 2);
            renderer.resize(width, height);
        });
        emitter.on('animation-frame', () => {
            const pow = Math.random();
            const s = Math.max(width, height) / 4;
            a += (Math.random() * 4 - 2) * pow;
            circles.addChild(Circle.gen(width, height, pow));
            circles.addChild(Circle.gen(width, height, pow));
            for (const circle of circles.children) {
                (circle as Circle).move(circles, width, height);
            }
            df.scale.x = Math.cos(a) * pow * s;
            df.scale.y = Math.sin(a) * pow * s;
            renderer.render(rts1, rt1, false, cameraMatrix);
            renderer.render(circles, rt1, false);
            renderer.render(container, rt2, false, cameraMatrix);
            renderer.render(container);
        });
        return () => emitter.removeAllListeners();
    }, arr0);
    return <canvas className={className} ref={canvas} width={width} height={height} />;
};
