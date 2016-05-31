import Pixi from 'pixi.js';

export default class Bamboo {
    constructor(context, {width, height}) {
        this.context = context;

        this.renderer = Pixi.autoDetectRenderer(width, height, {view: document.getElementById('gameCanvas')});
    }

    addScene() {

    }
}
