import {GameObject, DisplayObject, Sprite } from 'game/bamboo/Bamboo';
import Bamboo from 'game/bamboo/Bamboo';
import Input from 'game/bamboo/input/Input';
import Key from 'game/bamboo/input/Key';
import PlatformHelper from 'helpers/PlatformHelper';

import P2 from 'p2';
import PhysicisComponent from 'game/scenes/space/component/PhysicsComponent';


export default class Ship extends GameObject
{
	constructor(parent)
	{
		super("Ship", parent);

		this.addComponent(this.dp = new DisplayObject());
		this.addComponent(this.cat = Sprite.fromImage('/sprites/Ships/spaceShips_001.png'));

		if(PlatformHelper.isClient())
		{
			this.addComponent(this.physics = new PhysicisComponent(this, { mass: 1 }, new P2.Circle({ radius: 1 })));
		}
	}

	update(dt)
	{
		if(PlatformHelper.isClient())
		{
			if(Input.getKey(Key.W)) this.physics.body.applyForceLocal([0, 10]);
			if(Input.getKey(Key.S)) this.physics.body.applyForceLocal([0, 10]);

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

		}
	}
}