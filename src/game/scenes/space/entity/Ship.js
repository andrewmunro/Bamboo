import {GameObject, DisplayObject, Sprite } from 'game/bamboo/Bamboo';
import Bamboo from 'game/bamboo/Bamboo';
import Input from 'game/bamboo/input/Input';
import Key from 'game/bamboo/input/Key';
import PlatformHelper from 'helpers/PlatformHelper';

import P2 from 'p2';
import PhysicsComponent from 'game/scenes/space/component/PhysicsComponent';
import Laser from 'game/scenes/space/entity/Laser';
import Pixi, {Point} from 'pixi';

export default class Ship extends GameObject
{
	constructor(parent, id, name, spriteId, owner = false)
	{
		super("Ship", parent);
        this.soundManager = Bamboo.instance.soundManager;

        this.id = id;
		this.owner = owner;
		this.spriteId = spriteId;
        	this.name = name;

		if(PlatformHelper.isClient())
		{
			this.addComponent(this.dp = new DisplayObject());
			this.addComponent(this.ship = Sprite.fromImage('/sprites/Ships/spaceShips_00' + spriteId + '.png'));

			this.addComponent(this.fire = Sprite.fromImage('/sprites/flames-yellow.png'));
			this.fire.position.y = -40;

			this.addComponent(this.jet = Sprite.fromImage('/sprites/flame-red.png'));
			this.jet.position.y = -50;

			this.ship.scale = new Point(0.5, 0.5);

			this.nameplate = new Pixi.Text(name, { fill : 0xffffff });
			this.nameplate.anchor.x = 0.5;
			this.nameplate.anchor.y = -1;

			this.dp.displayObject.addChild(this.nameplate);
		}

        this.addComponent(this.physics = new PhysicsComponent({ mass: 1 }, new P2.Circle({ radius: 30 })));

        this.physics.body.position[0] = 500;
        this.physics.body.position[1] = 300;
	}

	update(dt)
	{
		if(PlatformHelper.isClient())
		{
			this.nameplate.rotation = -this.physics.body.angle;

			if(this.owner)
			{
				var speed = Input.getKey(Key.SHIFT) ? 60 : 10;

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
					this.shoot(true);
				}

				this.fire.scale.x = this.fire.scale.y = Input.getKey(Key.W) ? 1 : 0;
				this.jet.scale.x = this.jet.scale.y = Input.getKey(Key.SHIFT) ? 1 : 0;

				this.fireDown = Input.getKeyDown(Key.SPACE);
			}

		}


        if(PlatformHelper.isServer()) {
            this.physics.body.position[0] = this.transform.position.x;
            this.physics.body.position[1] = this.transform.position.y;
            this.physics.body.angle = this.transform.rotation;
        }
	}

	shoot(emit)
	{
            this.soundManager.playSound('/sounds/laser.mp3');
			var pos = [0, 0];
			this.physics.body.toWorldFrame(pos, [0, 50]);

			new Laser(this.parent, pos[0], pos[1], this.physics.body.angle);

			if(emit && PlatformHelper.isClient()) this.context.emit("fire", { id: this.id, x: pos[0], y: pos[1], r: this.physics.body.angle  });
	}
}
