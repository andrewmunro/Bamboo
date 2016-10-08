import Bamboo, {GameObject, DisplayObject, Sprite, Vector2} from 'game/bamboo/Bamboo';

export default class Ship extends GameObject {
    constructor(parent) {
        super('Ship', parent);
        this.addComponent(this.dp = new DisplayObject('ShipContainer'));

        this.addComponent(this.ship = Sprite.fromImage('/sprites/Ships/spaceShips_001.png'));
        //this.ship.position = new Vector2(500, 500);
        this.ship.rotation = 1.6;
    }
}
