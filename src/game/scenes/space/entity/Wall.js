import {GameObject, DisplayObject, Sprite, Vector2} from 'game/bamboo/Bamboo';

import P2 from 'p2';
import PhysicsComponent from 'game/scenes/space/component/PhysicsComponent';

import PlatformHelper from 'helpers/PlatformHelper';
import Pixi, {Point} from 'pixi';

export default class  extends GameObject {
    constructor(parent, x, y) {
        super('Wall', parent);



            var size = 3000;

            this.addComponent(this.top = new PhysicsComponent({ mass: 0 }, new P2.Box({ width: 100000, height: 50 })));
            this.top.body.position[0] = 0;
            this.top.body.position[1] = -size;

            this.addComponent(this.bottom = new PhysicsComponent({ mass: 0 }, new P2.Box({ width: 100000, height: 50 })));
            this.bottom.body.position[0] = 0;
            this.bottom.body.position[1] = size;

            this.addComponent(this.left = new PhysicsComponent({ mass: 0 }, new P2.Box({ height: 100000, width: 50 })));
            this.left.body.position[0] = -size;
            this.left.body.position[1] = 0;

            this.addComponent(this.right = new PhysicsComponent({ mass: 0 }, new P2.Box({ height: 100000, width: 50 })));
            this.right.body.position[0] = size;
            this.right.body.position[1] = 0;

            if(PlatformHelper.isClient())
        {
            this.addComponent(this.dp = new DisplayObject());
            var graphics = new Pixi.Graphics();
            graphics.beginFill(0xFF0000, 0);
            graphics.lineStyle(50, 0xFF0000, 0.5);
            graphics.drawRect(-size * 2, -size, size * 2, size * 2);


            this.dp.displayObject.addChild(graphics);
        }


    }
}
