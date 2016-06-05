import {Scene, Sprite} from 'game/bamboo/Bamboo';
import Bunny from 'game/scenes/Bunny';
import Vector2 from 'game/bamboo/math/Vector2';
import {fullscreenTwoPlayer} from 'game/bamboo/scene/camera/Cameras';

export default class TestScene extends Scene {
    constructor() {
        super('TestScene', fullscreenTwoPlayer());

        this.loader.add('bunny','http://www.goodboydigital.com/pixijs/examples/1/bunny.png');
    }

    start() {
        new Bunny(this, new Vector2());
        new Bunny(this, new Vector2(0, 768));
        new Bunny(this, new Vector2(1024, 768));
        new Bunny(this, new Vector2(1024, 0));
    }
}
