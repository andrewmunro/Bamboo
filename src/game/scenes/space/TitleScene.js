import Bamboo, {GameObject, DisplayObject, Sprite, Scene, Vector2} from 'game/bamboo/Bamboo';
import {fullscreen} from 'game/bamboo/scene/camera/Cameras';
import {clientOnly, serverOnly} from 'utils/Decorators';

import Moon from 'game/scenes/space/entity/Moon';

export default class TitleScene extends Scene {
    constructor() {
        super('TitleScene', fullscreen());
    }

    start() {
        this.transform.anchor = new Vector2(0,0);

        this.addComponent(this.background = Sprite.fromImage('/title/background.png'));
        this.background.position = new Vector2(1280 / 2, 720 / 2);

        this.moon = new Moon(this);
        this.moon.transform.position = new Vector2(Bamboo.instance.width / 2, Bamboo.instance.height / 2);

        this.addComponent(this.title = Sprite.fromImage('/title/title.png'));
        this.title.position = new Vector2(1280 / 2, 720 / 2);
    }

    update() {
        this.moon.rotation += 0.01;
    }
}
