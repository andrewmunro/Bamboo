import Pixi, {Container} from 'pixi.js';

import SceneManager from './scene/SceneManager';

let instance = null;

export default class Bamboo {
    constructor(context, {width, height}) {
        instance = this;

        this.context = context;
        this.width = width || 1024;
        this.height = height || 768

        this.renderer = Pixi.autoDetectRenderer(this.width, this.height, {view: document.getElementById('gameCanvas'), transparent: true});
        this.ticker = new Pixi.ticker.Ticker();
        this.stage = new Container();
        this.sceneManager = new SceneManager(this);

        this.stage.addChild(this.sceneManager.displayObject);
        this.ticker.add(this.update, this);
        this.ticker.start();
    }

    update(dt) {
        this.renderer.render(this.stage);
    }

    static get instance() {
        if (!instance) {
            throw new Error('Tried to get instance of Bamboo before it was created');
        }
        return instance;
    }
}

// Components
export Component from './component/Component';
export Transform from './component/Transform';
export Sprite from './component/Sprite';
export DisplayObject from './component/DisplayObject';

// Entities
export GameObject from './entity/GameObject';

// Scene
export Scene from './scene/Scene';
export Camera from './scene/camera/Camera';

// Helpers
export TypeHelpers from './helpers/TypeHelpers';
