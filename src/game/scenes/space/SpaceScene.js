import {GameObject, DisplayObject, Sprite, Scene} from 'game/bamboo/Bamboo';
import Vector2 from 'game/bamboo/math/Vector2';
import {fullscreen} from 'game/bamboo/scene/camera/Cameras';
import {clientOnly, serverOnly} from 'utils/Decorators';

import Ship from 'game/scenes/space/entity/Ship';
import Meteor from 'game/scenes/space/entity/Meteor';
import WorldComponent from 'game/scenes/space/component/WorldComponent';

export default class SpaceScene extends Scene {
    constructor() {
        super('SpaceScene', fullscreen());
    }

    start() {

        this.addComponent(new WorldComponent());

        new Meteor(this);
        new Ship(this);
    }

    update() {
        if(this.bg) {
            this.bg.rotation += 0.01;
        }
    }
}
