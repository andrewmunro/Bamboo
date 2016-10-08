import Component from 'game/bamboo/component/Component';
import P2 from 'p2';
import WorldComponent from 'game/scenes/space/component/WorldComponent';

export default class PhysicisComponent extends Component
{
	constructor(parent, body, shape)
	{
		super();

		this.shape = shape;
		this.body = new P2.Body(body);

		this.body.addShape(shape);
	}

	start()
	{
		this.world.addBody(this.body);
	}

	update(dt)
	{
		this.gameObject.transform.position.x = this.body.position[0];
		this.gameObject.transform.position.y = this.body.position[1];

		this.gameObject.transform.rotation = this.body.angle;
	}

	get world()
	{
		return this.gameObject.scene.getComponent(WorldComponent).world;
	}
}