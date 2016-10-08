import {GameObject, DisplayObject, Sprite, Vector2} from 'game/bamboo/Bamboo';

export default class Meteor extends GameObject {
    constructor(parent) {
        super('Meteor', parent);
        this.addComponent(this.dp = new DisplayObject('MeteorContainer'));

        this.addComponent(this.bg = Sprite.fromImage('/sprites/Meteors/spaceMeteors_001.png'));
        this.transform.position = new Vector2(512, 334);
        this.transform.scale = Vector2.equal(2);
    }

    update(dt) {
        this.transform.rotation += 0.01;
    }
}
