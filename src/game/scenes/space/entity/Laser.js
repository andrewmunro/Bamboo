import {GameObject, DisplayObject, Sprite } from 'game/bamboo/Bamboo';
import Bamboo from 'game/bamboo/Bamboo';
import Input from 'game/bamboo/input/Input';
import Key from 'game/bamboo/input/Key';
import PlatformHelper from 'helpers/PlatformHelper';

import P2 from 'p2';
import PhysicisComponent from 'game/scenes/space/component/PhysicsComponent';
import Pixi, {Point} from 'pixi';

export default class Laser extends GameObject
{
	constructor(parent, x, y, angle)
	{
		super("Ship", parent);

		this.addComponent(this.dp = new DisplayObject());
		this.addComponent(this.image = Sprite.fromImage('/sprites/lazor.png'));

		if(PlatformHelper.isClient())
		{
			this.addComponent(this.physics = new PhysicisComponent(this, { mass: 1, fixedRotation: true }, new P2.Circle({ radius: 1 })));

			this.physics.body.position[0] = x;
			this.physics.body.position[1] = y;
			this.physics.body.angle = angle;
		}
	}

	update(dt)
	{
		if(PlatformHelper.isClient())
		{
			this.physics.body.applyForceLocal([0, 1000]);
		}
	}
}