import Component from 'game/bamboo/component/Component';
import P2 from 'p2';
import {isType} from 'game/bamboo/helpers/TypeHelpers'
import Laser from 'game/scenes/space/entity/Laser';
import Ship from 'game/scenes/space/entity/Ship';

import Bamboo from 'game/bamboo/Bamboo';

export default class WorldComponent extends Component
{
	constructor()
	{
		super();

		this.world = new P2.World({
			gravity: [ 0, 0 ]
		});

        this.world.on("beginContact", event => {
            if(event.bodyA.gameObject && isType(event.bodyA.gameObject, Laser)) {
                event.bodyA.gameObject.destroy();

                if(event.bodyB.gameObject && isType(event.bodyB.gameObject, Ship)) {
                    this.playExplosion();
                }
            }

            if(event.bodyB.gameObject && isType(event.bodyB.gameObject, Laser)) {
                event.bodyB.gameObject.destroy();

                if(event.bodyA.gameObject && isType(event.bodyA.gameObject, Ship)) {
                    this.playExplosion();
                }
            }
        });
	}

    playExplosion() {
        Bamboo.instance.soundManager.playSound('/sounds/explosion.mp3');
    }

	update(dt)
	{
		this.world.step(1 / 60, dt, 10);
	}
}
