import {GameObject, DisplayObject, Sprite} from 'game/bamboo/Bamboo';

export default class Bunny extends GameObject {
    constructor(parent) {
        super('bunny', parent);

        this.addComponent(new DisplayObject());
        this.addComponent(this.sprite = Sprite.fromImage('http://www.goodboydigital.com/pixijs/examples/1/bunny.png'));
        this.transform.position.x = this.transform.position.y = 200;
    }

    update(dt) {
        this.transform.rotation += 0.05;

        super.update(dt);
    }
}
