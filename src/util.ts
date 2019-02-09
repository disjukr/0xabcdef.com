import { EventEmitter } from 'events';
import { Context, useState, useEffect, useContext, RefObject, useMemo, useRef } from 'react';

export const arr0 = [];
export const obj0 = {};
export const noop = () => {};

export interface Size {
    width: number;
    height: number;
}
export function useSize(ref: RefObject<HTMLElement>) {
    const windowSize = useWindowSize();
    const [size, setSize] = useState<Size | null>(null);
    useEffect(() => {
        if (!ref.current) return;
        const { width, height } = ref.current.getBoundingClientRect();
        setSize({ width, height });
    }, [ref, windowSize.width, windowSize.height]);
    return size;
}

const zeroSize = { width: 0, height: 0 };
export function useWindowSize() {
    const [windowSize, setWindowSize] = useState<Size>(zeroSize);
    useEffect(() => {
        const onResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    return windowSize;
}

export function useSubscribe<T>(context: Context<T>): [T, EventEmitter] {
    const [emitter] = useState(() => new EventEmitter());
    const value = useContext(context);
    const cached = useRef(value);
    if (value !== cached.current) {
        emitter.emit('update', value);
        cached.current = value;
    }
    return [value, emitter];
}

export function useRaf(hook: (elapsed: number, now: number) => void, fps: number = 60) {
    const [raf] = useState(() => new Raf(fps, hook));
    useEffect(() => {
        raf.fps = fps;
        raf.hook = hook;
    }, [hook, fps]);
    useEffect(() => {
        raf.loop = true;
        return () => {
            raf.loop = false;
        };
    }, arr0);
}

// TODO: 걷어내자. MarbleBackground가 의존중
export function useAnimationFrameLoop(emitter: EventEmitter, fps: number = 60) {
    const updater = useMemo(() => () => emitter.emit('animation-frame'), [emitter]);
    useRaf(updater, fps);
}

class Raf {
    constructor(fps: number, public hook: (elapsed: number, now: number) => void) {
        this.fps = fps;
    }
    private _loop: boolean = false;
    private _rafId: number | null = null;
    private _fps: number = 0;
    private _interval: number = 0;
    private _then: number = 0;
    set loop(value: boolean) {
        if (value && !this._loop) this.run();
        if (!value && this._loop) this.end();
        this._loop = value;
    }
    get loop() {
        return this._loop;
    }
    set fps(value: number) {
        this._fps = value;
        this._interval = 1000 / value;
    }
    get fps() {
        return this._fps;
    }
    private run = () => {
        this._rafId = requestAnimationFrame(this.run);
        const now = Date.now();
        const elapsed = now - this._then;
        if (elapsed > this._interval) {
            this._then = now - (elapsed % this._interval);
            this.hook(elapsed, now);
        }
    };
    private end() {
        if (this._rafId) cancelAnimationFrame(this._rafId);
        this._rafId = null;
    }
}

export function interleave<T, U>(arr: T[], gap: U): (T | U)[] {
    const result: (T | U)[] = [];
    for (const item of arr) result.push(item, gap);
    result.pop();
    return result;
}
