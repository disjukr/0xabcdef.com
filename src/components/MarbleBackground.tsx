import React, { useEffect, useRef, useMemo, useContext } from 'react';

import PIXI from '../pixi';
import { arr0, useRaf } from '../util';
import { layoutContext } from './Layout';

interface Props {
    className?: string;
}
export default ({ className }: Props) => {
    const canvas = useRef(null as any);
    const layoutState = useContext(layoutContext);
    const width = useRef(layoutState.width / 2);
    const height = useRef(layoutState.height / 2);
    const offset = 50;
    const a = useRef(0);
    const container = useRef(useMemo(() => new PIXI.Container(), arr0));
    const circles = useRef(useMemo(() => new PIXI.Container(), arr0));
    const renderer: React.MutableRefObject<ReturnType<typeof PIXI.autoDetectRenderer>> = useRef(
        null as any
    );
    const createRenderTextureWithPadding = () => {
        return PIXI.RenderTexture.create(width.current + offset * 2, height.current + offset * 2);
    };
    const rt1 = useRef(useMemo(createRenderTextureWithPadding, arr0));
    const rts1 = useRef(useMemo(() => new PIXI.Sprite(rt1.current), arr0));
    const rt2 = useRef(useMemo(createRenderTextureWithPadding, arr0));
    const rts2 = useRef(useMemo(() => new PIXI.Sprite(rt2.current), arr0));
    const df = useRef(useMemo(() => new PIXI.filters.DisplacementFilter(rts2.current), arr0));
    const cameraMatrix = useRef(useMemo(() => new PIXI.Matrix(), arr0));
    useEffect(() => {
        width.current = layoutState.width / 2;
        height.current = layoutState.height / 2;
        rt1.current.resize(width.current + offset * 2, height.current + offset * 2);
        rt2.current.resize(width.current + offset * 2, height.current + offset * 2);
        if (renderer.current) renderer.current.resize(width.current, height.current);
    }, [layoutState.width, layoutState.height]);
    useEffect(() => {
        renderer.current = PIXI.autoDetectRenderer(width.current, height.current, {
            view: canvas.current,
        });
        cameraMatrix.current.translate(offset, offset);
        rts1.current.x = -offset;
        rts1.current.y = -offset;
        rts2.current.x = -offset;
        rts2.current.y = -offset;
        const f = 0.9;
        const cf = new ColorTransformFilter(f, f, f);
        const cf2 = new PIXI.filters.ColorMatrixFilter();
        cf2.contrast(0.3);
        rts1.current.filters = [df.current, cf];
        container.current.addChild(rts1.current);
        container.current.filters = [cf2];
    }, arr0);
    useRaf(
        useMemo(
            () => () => {
                const pow = Math.random();
                const s = Math.max(width.current, height.current) / 4;
                a.current += (Math.random() * 4 - 2) * pow;
                circles.current.addChild(Circle.gen(width.current, height.current, pow));
                circles.current.addChild(Circle.gen(width.current, height.current, pow));
                for (const circle of circles.current.children) {
                    (circle as Circle).move(circles.current, width.current, height.current);
                }
                df.current.scale.x = Math.cos(a.current) * pow * s;
                df.current.scale.y = Math.sin(a.current) * pow * s;
                renderer.current.render(rts1.current, rt1.current, false, cameraMatrix.current);
                renderer.current.render(circles.current, rt1.current, false);
                renderer.current.render(rts1.current, rt2.current, false, cameraMatrix.current);
                renderer.current.render(container.current);
            },
            []
        ),
        50
    );
    return (
        <canvas className={className} ref={canvas} width={width.current} height={height.current} />
    );
};

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
