import {GameObject, DisplayObject, Sprite, Vector2} from 'game/bamboo/Bamboo';

export default class Moon extends GameObject {
    constructor(parent) {
        super('Moon', parent);
        this.addComponent(this.dp = new DisplayObject('MoonContainer'));

        this.addComponent(this.moon = Sprite.fromImage('/title/moon.png'));
        this.addComponent(this.moonShadow = Sprite.fromImage('/title/moon_shadow.png'));

        this.moonShadow.position = new Vector2(26, 0);
    }

    update(dt) {
        this.moon.rotation += 0.005;
    }
}
