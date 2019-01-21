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
    emitter: EventEmitter = new EventEmitter(),
    fps: number = 60,
): EventEmitter {
    const interval = 1000 / fps;
    useEffect(() => {
        let unmounted = false;
        let then = Date.now();
        const loop = () => {
            if (unmounted) return;
            requestAnimationFrame(loop);
            const now = Date.now();
            const elapsed = now - then;
            if (elapsed > interval) {
                then = now - (elapsed % interval);
                emitter.emit('animation-frame');
            }
        };
        loop();
        return () => {
            unmounted = true;
        };
    }, arr0);
    return emitter;
}
