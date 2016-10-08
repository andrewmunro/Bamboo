import {GameObject, DisplayObject, Sprite } from 'game/bamboo/Bamboo';
import Input from 'game/bamboo/input/Input';
import Key from 'game/bamboo/input/Key';

export default class Ship extends GameObject
{
	constructor(parent)
	{
		super("Ship", parent);

		this.addComponent(this.dp = new DisplayObject());
		this.addComponent(this.cat = Sprite.fromImage('/sprites/Ships/spaceShips_001.png'));
	}

	update(dt)
	{
		if(Input.getKey(Key.W))
		{
			console.log("Hello world");
		}
	}
}