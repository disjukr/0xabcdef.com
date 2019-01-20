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

export function useAnimationFrameLoop(emitter: EventEmitter = new EventEmitter()): EventEmitter {
    useEffect(() => {
        let unmounted = false;
        const loop = () => {
            if (unmounted) return;
            emitter.emit('animation-frame');
            requestAnimationFrame(loop);
        };
        loop();
        return () => {
            unmounted = true;
        };
    }, arr0);
    return emitter;
}
