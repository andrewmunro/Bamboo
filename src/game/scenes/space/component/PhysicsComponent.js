import Component from 'game/bamboo/component/Component';
import P2 from 'p2';
import WorldComponent from 'game/scenes/space/component/WorldComponent';

export default class PhysicsComponent extends Component
{
	constructor(body, shape, owner = true)
	{
		super();

		this.shape = shape;
        this.owner = owner;
		this.body = new P2.Body(body);

		this.body.addShape(shape);
	}

	start()
	{
		this.world.addBody(this.body);

        this.body.gameObject = this.gameObject;
	}

    destroy() {
        if(this.world) {
            this.world.removeBody(this.body);
        }
    }

	update(dt)
	{
        if(this.owner) {
            this.transform.position.x = this.body.position[0];
            this.transform.position.y = this.body.position[1];

            this.transform.rotation = this.body.angle;
        }// else {
        //    this.body.position[0] = this.transform.position.x;
        //    this.body.position[1] = this.transform.position.y;
        //    this.body.angle = this.transform.rotation;
        //}

	}

	get world()
	{
		return this.gameObject.scene && this.gameObject.scene.getComponent(WorldComponent) ? this.gameObject.scene.getComponent(WorldComponent).world : null;
	}
}
