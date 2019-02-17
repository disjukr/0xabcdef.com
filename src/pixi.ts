const fakePixi = {
    autoDetectRenderer() {},
    Matrix: class {},
    RenderTexture: class {
        static create() {}
    },
    Graphics: class {},
    Container: class {},
    Sprite: class {},
    filters: {
        ColorMatrixFilter: class {},
        DisplacementFilter: class {},
    },
};

export default (typeof window !== 'undefined'
    ? require('pixi.js')
    : fakePixi) as typeof import('pixi.js');
