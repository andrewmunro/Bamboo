import Component from 'game/bamboo/component/Component';
import P2 from 'p2';
import WorldComponent from 'game/scenes/space/component/WorldComponent';

export default class PhysicisComponent extends Component
{
	constructor(parent, body)
	{
		super();

		this.body = body;
		this.world = this.scene.getComponent(WorldComponent).world;

		this.world.addBody(body);
	}

	update(dt)
	{
		console.log(this.body.position);
	}
}