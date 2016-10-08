import {GameObject, DisplayObject, Sprite, Scene} from 'game/bamboo/Bamboo';
import Vector2 from 'game/bamboo/math/Vector2';
import {fullscreen} from 'game/bamboo/scene/camera/Cameras';
import {clientOnly, serverOnly} from 'utils/Decorators';

import Ship from 'game/scenes/space/entity/Ship';
import Meteor from 'game/scenes/space/entity/Meteor';

export default class SpaceScene extends Scene {
    constructor() {
        super('SpaceScene', fullscreen());
    }

    start() {
        new Meteor(this);
        new Ship(this);
    }

    update() {
        if(this.bg) {
            this.bg.rotation += 0.01;
        }
    }
}
