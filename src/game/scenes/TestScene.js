import {Scene, Sprite} from 'game/bamboo/Bamboo';
import Bunny from 'game/scenes/Bunny';
import Vector2 from 'game/bamboo/math/Vector2';
import {fullscreen} from 'game/bamboo/scene/camera/Cameras';

export default class TestScene extends Scene {
    constructor() {
        super('TestScene', fullscreen());

        this.loader.add('bunny','http://www.goodboydigital.com/pixijs/examples/1/bunny.png');
    }

    start() {
        new Bunny(this, new Vector2(512, 334));
    }
}
