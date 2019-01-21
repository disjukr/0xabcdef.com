import { EventEmitter } from 'events';
import { Context, useState, useEffect, useContext } from 'react';

export const arr0 = [];
export const obj0 = {};
export const noop = () => {};

export function useSubscribe<T>(context: Context<T>): [T, EventEmitter] {
    const [emitter] = useState(() => new EventEmitter());
    const value = useContext(context);
    const [cachedValue, updateCache] = useState(value);
    if (value !== cachedValue) {
        emitter.emit('update', value);
        updateCache(value);
    }
    return [value, emitter];
}

export function useAnimationFrameLoop(
    emitter: EventEmitter,
    fps: number = 60,
) {
    const [raf] = useState(new Raf(fps, () => emitter.emit('animation-frame')));
    raf.fps = fps;
    useEffect(() => {
        raf.loop = true;
        return () => {
            raf.loop = false;
        };
    }, arr0);
}

class Raf {
    constructor(fps: number, public hook: () => void) {
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
            this.hook();
        }
    };
    private end() {
        if (this._rafId) cancelAnimationFrame(this._rafId);
        this._rafId = null;
    };
}
