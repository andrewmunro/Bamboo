import {GameObject, DisplayObject, Sprite} from 'game/bamboo/Bamboo';

import Input from 'game/bamboo/input/Input';
import Key from 'game/bamboo/input/Key';

export default class Bunny extends GameObject {
    constructor(parent, pos) {
        super('bunny', parent);

        this.addComponent(new DisplayObject('BunnyContainer'));
        this.addComponent(this.sprite = Sprite.fromImage('http://www.goodboydigital.com/pixijs/examples/1/bunny.png'));
        this.transform.position = pos;
    }

    update(dt) {
        this.transform.rotation += 0.05;

        if(Input.getKeyDown(Key.W)) {
            console.log("KeyDown: Only Called once");
        }

        if(Input.getKey(Key.W)) {
            console.log("Whilst key down");
        }

        if(Input.getKeyUp(Key.W)) {
            console.log("KeyUp: Only called once")
        }
    }
}
