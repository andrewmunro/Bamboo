import {GameObject, DisplayObject, Sprite} from 'game/bamboo/Bamboo';

export default class Bunny extends GameObject {
    constructor(parent, pos) {
        super('bunny', parent);

        this.addComponent(new DisplayObject('BunnyContainer'));
        this.addComponent(this.sprite = Sprite.fromImage('http://www.goodboydigital.com/pixijs/examples/1/bunny.png'));
        this.transform.position = pos;
    }

    update(dt) {
        this.transform.rotation += 0.05;
    }
}
