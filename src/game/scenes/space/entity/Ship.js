import {GameObject, DisplayObject, Sprite } from 'game/bamboo/Bamboo';
import Bamboo from 'game/bamboo/Bamboo';
import Input from 'game/bamboo/input/Input';
import Key from 'game/bamboo/input/Key';
import PlatformHelper from 'helpers/PlatformHelper';

import P2 from 'p2';
import PhysicisComponent from 'game/scenes/space/component/PhysicsComponent';
import Laser from 'game/scenes/space/entity/Laser';
import Pixi, {Point} from 'pixi';

export default class Ship extends GameObject
{
	constructor(parent)
	{
		super("Ship", parent);

		this.addComponent(this.dp = new DisplayObject());
		this.addComponent(this.cat = Sprite.fromImage('/sprites/Ships/spaceShips_001.png'));

		this.addComponent(this.fire = Sprite.fromImage('/sprites/flames-yellow.png'));
		this.fire.position.y = -40;

		this.addComponent(this.jet = Sprite.fromImage('/sprites/flame-red.png'));
		this.jet.position.y = -50;

		this.cat.scale = new Point(0.5, 0.5);

		if(PlatformHelper.isClient())
		{
			this.addComponent(this.physics = new PhysicisComponent(this, { mass: 1 }, new P2.Circle({ radius: 1 })));

			this.physics.body.position[0] = 500;
			this.physics.body.position[1] = 300;
		}
	}

	update(dt)
	{
		if(PlatformHelper.isClient())
		{
			var speed = Input.getKey(Key.SHIFT) ? 30 : 10;

			if(Input.getKey(Key.W)) this.physics.body.applyForceLocal([0, speed]);
			if(Input.getKey(Key.S)) this.physics.body.applyForceLocal([0, -10]);

			if(Input.getKey(Key.D))
			{
				this.physics.body.angularVelocity = 0.3;
			}
			else if(Input.getKey(Key.A))
			{
				this.physics.body.angularVelocity = -0.3;
			}
			else
			{
				this.physics.body.angularVelocity = 0;
			}

			if(!this.fireDown && Input.getKeyDown(Key.SPACE))
			{
				var pos = [0, 0];
				this.physics.body.toWorldFrame(pos, [0, 50]);

				new Laser(this.parent, pos[0], pos[1], this.physics.body.angle);
			}

			this.fire.scale.x = this.fire.scale.y = Input.getKey(Key.W) ? 1 : 0;
			this.jet.scale.x = this.jet.scale.y = Input.getKey(Key.SHIFT) ? 1 : 0;

			this.fireDown = Input.getKeyDown(Key.SPACE);

		}
	}
}