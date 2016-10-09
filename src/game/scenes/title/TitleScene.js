import Bamboo, {GameObject, DisplayObject, Sprite, Scene, Vector2} from 'game/bamboo/Bamboo';
import {fullscreen} from 'game/bamboo/scene/camera/Cameras';
import {clientOnly, serverOnly} from 'utils/Decorators';

import Moon from 'game/scenes/title/entity/Moon';
import Ship from 'game/scenes/title/entity/Ship';
import TWEEN, {Tween} from 'tween.js';


export default class TitleScene extends Scene {
    constructor() {
        super('TitleScene', fullscreen());
    }

    @clientOnly
    start() {
        this.transform.anchor = new Vector2(0,0);

        this.addComponent(this.background = Sprite.fromImage('/title/background.png'));
        this.background.position = new Vector2(1280 / 2, 720 / 2);

        this.moon = new Moon(this);
        this.moon.transform.position = new Vector2(Bamboo.instance.width / 2, Bamboo.instance.height / 2);

        this.addComponent(this.title = Sprite.fromImage('/title/title.png'));
        this.title.position = new Vector2(1280 / 2, 720 / 2);

        this.ship = new Ship(this);
        this.ship.transform.position = new Vector2(1600, 100);

        let xTween = new Tween(this.ship.transform.position)
            .to({x: -300}, 7000)
            .easing( TWEEN.Easing.Quadratic.InOut )
            .repeat( Infinity )
            .start();
    }
}
