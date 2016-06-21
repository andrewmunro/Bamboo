import {Scene, Sprite} from 'game/bamboo/Bamboo';
import Cat from 'game/scenes/Cat';
import Vector2 from 'game/bamboo/math/Vector2';
import {fullscreen} from 'game/bamboo/scene/camera/Cameras';

export default class TestScene extends Scene {
    constructor() {
        super('TestScene', fullscreen());

        this.loader.add('cat','https://c1.staticflickr.com/3/2389/2073509907_345ad52bc1.jpg');
        this.loader.add('mouthPiece','https://media1.giphy.com/media/GWIpvD12KeoE/200_s.gif');
    }

    start() {
        new Cat(this);
    }
}
