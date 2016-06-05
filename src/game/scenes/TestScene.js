import {Scene, Sprite} from 'game/bamboo/Bamboo';
import Bunny from 'game/scenes/Bunny';

export default class TestScene extends Scene {
    constructor() {
        super('TestScene');

        this.loader.add('bunny','http://www.goodboydigital.com/pixijs/examples/1/bunny.png');
    }

    start() {
        super.start();

        let bunny = new Bunny(this);
    }
}
