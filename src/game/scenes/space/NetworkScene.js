import Bamboo, {GameObject, DisplayObject, Sprite, Scene} from 'game/bamboo/Bamboo';
import Vector2 from 'game/bamboo/math/Vector2';
import {fullscreen} from 'game/bamboo/scene/camera/Cameras';
import {clientOnly, serverOnly} from 'utils/Decorators';
import Pixi, {Point} from 'pixi';
import PlayerStore from 'stores/PlayerStore';

import Ship from 'game/scenes/space/entity/Ship';
import Meteor from 'game/scenes/space/entity/Meteor';
import WorldComponent from 'game/scenes/space/component/WorldComponent';
import PlatformHelper from 'helpers/PlatformHelper';

export default class NetworkScene extends Scene
{
	constructor()
	{
		super('NetworkScene', fullscreen());

		this.players = {};
		this.index = 0;

		var names = [
			"Barry",
			"Herambe",
			"DrSpliff",
			"JonnyShoots",
			"CptPoopaScoop"
		];

		this.name = names[Math.floor(Math.random() * (names.length - 1))];
	}

	start()
	{
		if(PlatformHelper.isClient())
		{
			this.addComponent(new WorldComponent());

			this.addComponent(Sprite.fromImage('/sprites/pattern.png', true));

			var graphics = new Pixi.Graphics();

			graphics.lineStyle(1, 0xFF0000, 1);
			graphics.moveTo(1280 / 2, 0);
			graphics.lineTo(1280 / 2, 720);

			graphics.lineStyle(1, 0x00FF00, 1);
			graphics.moveTo(0, 720 / 2);
			graphics.lineTo(1280, 720 / 2);

			this.displayObject.displayObject.addChild(graphics);
		}

		this.context.handle('add-player', this.addPlayer.bind(this));
		this.context.handle('move-player', this.movePlayer.bind(this));
		this.context.handle('fire', this.fire.bind(this));

		if(PlatformHelper.isClient()) this.context.emit('request-join', { name: this.name });
		if(PlatformHelper.isServer()) this.context.handle('request-join', this.requestJoin.bind(this));

		this.updateTick = 0;

		// if(PlatformHelper.isClient())
		// {
		// 	this.addPlayer({ id: 0, name: "Test",  spriteId: 1 });
		// 	this.movePlayer({ id: 0, x: 1280 / 2, y: 720 / 2, r: 10 });

		// 	this.addPlayer({ id: 1, name: "Barry", spriteId: 3 }, true);
		// 	this.movePlayer({ id: 0, x: 0, y: 0, r: 0 });

		// 	setInterval(() => {
		// 		this.fire({ id: 1 });
		// 	}, 2000);
		// }
	}

	fire(data)
	{
		if(PlatformHelper.isServer())
		{
			this.context.emit('fire', { id: data.id });
		}
		else
		{
			if(this.localPlayer && data.id == this.localPlayer.id) return;

			this.players[data.id].shoot(false);
		}
	}

	requestJoin({ name })
	{
		if(PlatformHelper.isServer())
		{
			this.addPlayer({ id: this.index++, name: name, spriteId: 1, x: 1280 / 2, y: 720 / 2, r: 0 });

		}
	}

	addPlayer(data, owner = false)
	{
		this.players[data.id] = new Ship(this, data.id, data.name, data.spriteId, owner);



		if(PlatformHelper.isServer()) this.context.emit('add-player', data);



		if(PlatformHelper.isClient())
		{
			this.movePlayer(data);

			if(data.name == this.name)
			{
				this.localPlayer = this.players[data.id];
				this.localPlayer.owner = true;
			}
		}
	}

	movePlayer(data)
	{
		if(this.localPlayer && data.id == this.localPlayer.id) return;

		if(PlatformHelper.isClient() && this.players[data.id])
		{
			this.players[data.id].physics.body.position[0] = data.x;
			this.players[data.id].physics.body.position[1] = data.y;

			this.players[data.id].physics.body.angle = data.r;
		}

		if(PlatformHelper.isServer()) this.context.emit('move-player', data);
	}

	update()
	{
		if(PlatformHelper.isClient() && this.localPlayer)
		{
			if(this.updateTick > 0)
			{
				this.updateTick = 0;

				this.context.emit('move-player', {
					id: this.localPlayer.id,
					x: this.localPlayer.physics.body.position[0],
					y: this.localPlayer.physics.body.position[1],
					r: this.localPlayer.physics.body.angle
				});
			}

			this.updateTick++;
		}
	}
}
