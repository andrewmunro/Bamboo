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
		this.meteors = [];

		this.defaultNames = [
			"Barry",
			"Herambe",
			"DrSpliff",
			"JonnyShoots",
			"CptPoopaScoop"
		];
	}

	start()
	{
        let name = this.context.getStore(PlayerStore).playerName;
        this.name = (name || this.defaultNames[Math.floor(Math.random() * (this.defaultNames.length - 1))]) + Math.floor(1000 + Math.random() * 9000);

		if(PlatformHelper.isClient())
		{
            this.addComponent(this.background = Sprite.fromImage('/sprites/bg_back1.png', true));
            this.addComponent(this.foreground = Sprite.fromImage('/sprites/bg_front.png', true));
            this.context.handle('move-meteors', this.moveMeteors.bind(this));
        }

        this.addComponent(new WorldComponent());

        for (let i = 5; i >= 0; i--) {
            let x = (Math.random() * 2000) - 1000;
            let y = (Math.random() * 2000) - 1000;

            this.meteors.push(new Meteor(this, x, y));
        }

		this.context.handle('add-player', this.addPlayer.bind(this));
		this.context.handle('move-player', this.movePlayer.bind(this));
		this.context.handle('fire', this.fire.bind(this));

		if(PlatformHelper.isClient()) this.context.emit('request-join', { name: this.name });
		if(PlatformHelper.isServer()) this.context.handle('request-join', this.requestJoin.bind(this));

		this.updateTick = 0;
	}

	fire(data)
	{
		if(PlatformHelper.isServer())
		{
			this.context.emit('fire', { id: data.id });
		}
			if(this.localPlayer && data.id == this.localPlayer.id) return;

			if(this.players[data.id]) this.players[data.id].shoot(false);
		//}
	}

    moveMeteors(data) {
        for(let i = 0; i < data.length; i++) {
            this.meteors[i].transform.position = new Vector2(data[i].x, data[i].y);
            this.meteors[i].rotation = data[i].rotation;
        }
    }

	requestJoin(data)
	{
		if(PlatformHelper.isServer())
		{
            Object.keys(this.players).forEach(key => {
                let player = this.players[key];

                this.context.emit('add-player', {
                    id: player.id,
                    name: player.name,
                    spriteId: player.spriteId,
                    x: player.x,
                    y: player.y,
                    r: 0
                }, data.sender);
            });


			this.addPlayer({ id: this.index++, name: data.name, spriteId: 1, x: 1280 / 2, y: 720 / 2, r: 0 });

		}
	}

	addPlayer(data, owner = false)
	{
		this.players[data.id] = new Ship(this, data.id, data.name, data.spriteId, owner);

        if(PlatformHelper.isServer()) {
            this.players[data.id].x = 500;
            this.players[data.id].y = 500;
        }

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

        if(PlatformHelper.isServer() && this.players[data.id]) {
            this.players[data.id].transform.position.x = data.x;
            this.players[data.id].transform.position.y = data.y;
            this.players[data.id].transform.rotation = data.r;
        }

		if(PlatformHelper.isServer()) this.context.emit('move-player', data);
	}

	update()
	{
		if(PlatformHelper.isClient() && this.localPlayer)
		{
			this.foreground.position.x = this.cameraManager.cameras[0].targetPosition.x * 0.1;
		            this.foreground.position.y = this.cameraManager.cameras[0].targetPosition.y * 0.1;

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

            this.cameraManager.cameras[0].targetPosition.x = this.localPlayer.transform.position.x;
            this.cameraManager.cameras[0].targetPosition.y = this.localPlayer.transform.position.y;

			this.updateTick++;
		}



        if(PlatformHelper.isServer()) {
            this.context.emit('move-meteors', this.meteors.map(meteor => ({
                    x: meteor.transform.position.x,
                    y: meteor.transform.position.y,
                    r: meteor.transform.rotation
                })
            ));
        }
	}
}
