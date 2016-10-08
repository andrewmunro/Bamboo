import Bamboo, {GameObject, DisplayObject, Sprite, Scene} from 'game/bamboo/Bamboo';
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

        this.addComponent(this.background = Sprite.fromImage('/sprites/bg_back1.png', true));
        this.addComponent(this.foreground = Sprite.fromImage('/sprites/bg_front.png', true));

        // this.background.position = Bamboo.instance.center;

        new Meteor(this);
        this.ship = new Ship(this);
    }

    @clientOnly
    update() {
        if(this.ship) {
            this.cameraManager.cameras[0].targetPosition.x = this.ship.transform.position.x;
            this.cameraManager.cameras[0].targetPosition.y = this.ship.transform.position.y;


            this.foreground.position.x = this.cameraManager.cameras[0].targetPosition.x * 0.1;
            this.foreground.position.y = this.cameraManager.cameras[0].targetPosition.y * 0.1;
        }
    }
}
