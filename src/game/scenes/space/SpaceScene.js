import {GameObject, DisplayObject, Sprite, Scene} from 'game/bamboo/Bamboo';
import Vector2 from 'game/bamboo/math/Vector2';
import {fullscreen} from 'game/bamboo/scene/camera/Cameras';
import {clientOnly, serverOnly} from 'utils/Decorators';

import Ship from 'game/scenes/space/entity/Ship';

export default class SpaceScene extends Scene {
    constructor() {
        super('SpaceScene', fullscreen());
    }

    start() {
        this.addComponent(this.bg = Sprite.fromImage('/sprites/Meteors/spaceMeteors_001.png'));
        this.bg.position = new Vector2(512, 334);

        new Ship(this);

    }

    update() {
        if(this.bg) {
            this.bg.rotation += 0.01;
        }
    }
}
