import {GameObject, DisplayObject, Sprite, Vector2} from 'game/bamboo/Bamboo';

import P2 from 'p2';
import PhysicsComponent from 'game/scenes/space/component/PhysicsComponent';

import PlatformHelper from 'helpers/PlatformHelper';


export default class Meteor extends GameObject {
    constructor(parent, x, y) {
        super('Meteor', parent);
        this.addComponent(this.dp = new DisplayObject('MeteorContainer'));

        if(PlatformHelper.isServer()) {
            this.addComponent(this.physics = new PhysicsComponent({ mass: 5 }, new P2.Circle({ radius: 100 })));
            this.physics.body.position[0] = x;
            this.physics.body.position[1] = y;
        }

        this.addComponent(this.bg = Sprite.fromImage('/sprites/Meteors/spaceMeteors_00' + (1 + Math.floor(Math.random() * 3)) + '.png'));
        this.transform.position = new Vector2(x, y);
        this.transform.scale = Vector2.equal(1);
    }

    update(dt) {
        this.transform.rotation += 0.01;
    }
}
