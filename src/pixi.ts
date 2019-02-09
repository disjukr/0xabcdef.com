const fakePixi = {
    autoDetectRenderer() {},
    Matrix() {},
    RenderTexture: class {
        static create() {}
    },
    Graphics() {},
    Container() {},
    Sprite() {},
    filters: { ColorMatrixFilter() {} },
};

export default (typeof window !== 'undefined'
    ? require('pixi.js')
    : fakePixi) as typeof import('pixi.js');
