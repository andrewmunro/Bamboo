import Pixi, {Container} from 'pixi';

import SceneManager from './scene/SceneManager';
import input from './input/Input';

let instance = null;

export default class Bamboo {
    constructor(context, {width, height}) {
        instance = this;

        this.context = context;
        this.width = width || 1024;
        this.height = height || 768

        this.renderer = Pixi.autoDetectRenderer(this.width, this.height, {view: document.getElementById('gameCanvas'), transparent: true});
        this.stage = new Container();
        this.sceneManager = new SceneManager();

        this.stage.addChild(this.sceneManager.displayObject);

        this.preUpdate = new Pixi.ticker.Ticker();
        this.update = new Pixi.ticker.Ticker();
        this.postUpdate = new Pixi.ticker.Ticker();

        this.ticker = new Pixi.ticker.Ticker();
        this.ticker.start();

        this.ticker.add(this.onTick, this);
        this.postUpdate.add(this.onPostUpdate, this);
    }

    onTick(dt) {
        // Update child tickers manually
        let currentTime = this.ticker.elapsedMS + this.ticker.lastTime
        this.preUpdate.update(currentTime);
        this.update.update(currentTime);
        this.postUpdate.update(currentTime);
    }

    onPostUpdate(dt) {
        input.postUpdate(dt);
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

// Math
export Vector2 from './math/Vector2';

// Helpers
export * from './helpers/TypeHelpers';
