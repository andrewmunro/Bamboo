import Bamboo, {GameObject, DisplayObject, Sprite, Scene} from 'game/bamboo/Bamboo';
import Vector2 from 'game/bamboo/math/Vector2';
import {fullscreen} from 'game/bamboo/scene/camera/Cameras';
import {clientOnly, serverOnly} from 'utils/Decorators';
import Pixi, {Point} from 'pixi';
import PlayerStore from 'stores/PlayerStore';

import Ship from 'game/scenes/space/entity/Ship';
import Wall from 'game/scenes/space/entity/Wall';
import Planets from 'game/scenes/space/entity/Planets';
import Meteor from 'game/scenes/space/entity/Meteor';
import WorldComponent from 'game/scenes/space/component/WorldComponent';
import PlatformHelper from 'helpers/PlatformHelper';

import P2 from 'p2';
import PhysicsComponent from 'game/scenes/space/component/PhysicsComponent';

export default class NetworkScene extends Scene {
    constructor() {
        super('NetworkScene', fullscreen());

        this.players = {};
        this.meteors = [];

        this.defaultNames = [
            "Barry",
            "Herambe",
            "DrSpliff",
            "JonnyShoots",
            "CptPoopaScoop"
        ];

        this.soundManager = Bamboo.instance.soundManager;

        this.soundManager.addSound('/sounds/engine.mp3');
        this.soundManager.addSound('/sounds/explosion.mp3');
        this.soundManager.addSound('/sounds/laser.mp3');
    }

    start() {
        let name = this.context.getStore(PlayerStore).playerName;
        this.name = (name || this.defaultNames[Math.floor(Math.random() * (this.defaultNames.length - 1))]) + Math.floor(1000 + Math.random() * 9000);

        if (PlatformHelper.isClient()) {
            this.addComponent(this.background = Sprite.fromImage('/sprites/bg_back1.png', true));
            this.addComponent(this.foreground = Sprite.fromImage('/sprites/bg_front.png', true));

            new Planets(this);

            this.context.handle('move-meteors', this.moveMeteors.bind(this));
        }

        this.addComponent(new WorldComponent());

        for (let i = 30; i >= 0; i--) {
            let x = (Math.random() * 4000) - 2000;
            let y = (Math.random() * 4000) - 2000;

            this.meteors.push(new Meteor(this, x, y));
        }

        new Wall(this);

        this.context.handle('add-player', this.addPlayer.bind(this));
        this.context.handle('move-player', this.movePlayer.bind(this));
        this.context.handle('move-players', this.movePlayers.bind(this));
        this.context.handle('fire', this.fire.bind(this));
        this.context.handle('remove-player', this.removePlayer.bind(this));

        this.context.handle('disconnect', (data) => {
            if (PlatformHelper.isServer()) {
                this.context.emit('remove-player', data);
            }

            this.removePlayer(data);
        });

        if (PlatformHelper.isClient()) this.context.emit('request-join', {name: this.name});
        if (PlatformHelper.isServer()) this.context.handle('request-join', this.requestJoin.bind(this));

        this.updateTick = 0;
    }

    fire(data) {
        if (PlatformHelper.isServer()) {
            this.context.emit('fire', {id: data.id});
        }
        if (this.localPlayer && data.id == this.localPlayer.id) return;

        if (this.players[data.id]) this.players[data.id].shoot(false);
    }

    moveMeteors(data) {
        for (let i = 0; i < data.length; i++) {
            this.meteors[i].transform.position = new Vector2(data[i].x, data[i].y);
            this.meteors[i].rotation = data[i].rotation;
        }
    }

    requestJoin(data) {
        if (PlatformHelper.isServer()) {
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

            var x = -500 + (Math.random() * 1000);
            var y = -500 + (Math.random() * 1000);

            this.addPlayer({id: data.sender, name: data.name, spriteId: 1, x: x, y: y, r: 0});

        }
    }

    addPlayer(data, owner = false) {
        this.players[data.id] = new Ship(this, data.id, data.name, data.spriteId, owner);

        if (PlatformHelper.isClient()) {
            this.movePlayer(data);

            if (data.name == this.name) {
                this.localPlayer = this.players[data.id];
                this.localPlayer.owner = true;
            }
        } else {
            this.context.emit('add-player', data);
        }
    }

    removePlayer(data) {
        let ship = this.players[data.id];

        if (ship) {
            console.log("DESTROYING " + data.id);
            delete this.players[data.id];
            ship.destroy();
        }
    }

    movePlayer(data) {
        if (PlatformHelper.isServer() && this.players[data.id]) {
            this.players[data.id].transform.position.x = data.x;
            this.players[data.id].transform.position.y = data.y;
            this.players[data.id].transform.rotation = data.r;
        }
    }

    movePlayers(data) {
        if (PlatformHelper.isClient()) {
            data.forEach(player => {
                if (this.localPlayer && player.id === this.localPlayer.id) return;

                if (this.players[player.id]) {
                    this.players[player.id].physics.body.position[0] = player.x;
                    this.players[player.id].physics.body.position[1] = player.y;
                    this.players[player.id].physics.body.angle = player.r;
                }
            });
        }
    }

    map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    lerp(value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
    }

    update() {
        if (PlatformHelper.isClient() && this.localPlayer) {
            var velocity = Math.sqrt(Math.pow(this.localPlayer.physics.body.velocity[0], 2) + Math.pow(this.localPlayer.physics.body.velocity[1], 2));

            this.cameraManager.cameras[0].targetZoom = this.lerp(this.cameraManager.cameras[0].targetZoom, this.map_range(velocity, 0, 40, 0.6, 0.5), 0.9);

            this.foreground.position.x = this.cameraManager.cameras[0].targetPosition.x * 0.1;
            this.foreground.position.y = this.cameraManager.cameras[0].targetPosition.y * 0.1;

            if (this.updateTick > 0) {
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

        if (PlatformHelper.isServer()) {
            this.context.emit('move-meteors', this.meteors.map(meteor => ({
                    x: meteor.transform.position.x,
                    y: meteor.transform.position.y,
                    r: meteor.transform.rotation
                })
            ));

            this.context.emit('move-players', Object.keys(this.players).map(playerId => ({
                id: playerId,
                x: this.players[playerId].transform.position.x,
                y: this.players[playerId].transform.position.y,
                r: this.players[playerId].transform.rotation
            })));
        }
    }
}
