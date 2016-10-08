import Component from 'game/bamboo/component/Component';
import P2 from 'p2';

export default class WorldComponent extends Component
{
	constructor(parent)
	{
		super();

		console.log(P2);

		this.world = new P2.World({
			gravity: [ 0, 0 ]
		});

		console.log(this.world);
	}

	update(dt)
	{
		this.world.step(1 / 60, dt, 10);
	}
}