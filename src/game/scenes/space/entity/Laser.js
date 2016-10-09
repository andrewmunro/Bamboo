import {GameObject, DisplayObject, Sprite, Vector2 } from 'game/bamboo/Bamboo';
import Bamboo from 'game/bamboo/Bamboo';
import Input from 'game/bamboo/input/Input';
import Key from 'game/bamboo/input/Key';
import PlatformHelper from 'helpers/PlatformHelper';

import P2 from 'p2';
import PhysicsComponent from 'game/scenes/space/component/PhysicsComponent';
import Pixi, {Point} from 'pixi';

export default class Laser extends GameObject
{
	constructor(parent, x, y, angle)
	{
		super("Ship", parent);

		this.addComponent(this.dp = new DisplayObject());
		this.addComponent(this.image = Sprite.fromImage('/sprites/lazor.png'));


        this.addComponent(this.physics = new PhysicsComponent({ mass: 0.1 }, new P2.Circle({ radius: 1 })));

        this.physics.body.gameObject = this;
        this.physics.body.position[0] = x;
        this.physics.body.position[1] = y;
        this.physics.body.angle = angle;

        this.physics.update(0);
        this.image.update(0);

        setTimeout(() => {
            this.destroy();
        }, 5000);
	}

    destroy() {
        this.physics.world.removeBody(this.physics.body);
        this.removeComponent(this.image);

        this.transform.scale = new Vector2();

        //this.enabled = false;
    }

	update(dt)
	{
        this.physics.body.applyForceLocal([0, 1000]);
	}
}
