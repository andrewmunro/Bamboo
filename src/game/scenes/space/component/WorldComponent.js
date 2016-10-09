import Component from 'game/bamboo/component/Component';
import P2 from 'p2';
import {isType} from 'game/bamboo/helpers/TypeHelpers'
import Laser from 'game/scenes/space/entity/Laser';

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
            }

            if(event.bodyB.gameObject && isType(event.bodyB.gameObject, Laser)) {
                event.bodyB.gameObject.destroy();
            }
        });
	}

	update(dt)
	{
		this.world.step(1 / 60, dt, 10);
	}
}
