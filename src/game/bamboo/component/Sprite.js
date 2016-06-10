import Pixi, {Point} from 'pixi';

import Component from './Component';

export default class Sprite extends Component {
    static componentName = 'Sprite'

    constructor(texture) {
        super();

        this._texture = texture;
    }

    start() {
        let displayObject = this.gameObject.getComponent('DisplayObject');
        if(!displayObject) {
            throw new Error(`Tried adding a sprite to ${this.gameObject.id} failed. ${this.gameObject.id} requires a displayObject component.`);
        }
        if(this.sprite) {
            displayObject.removeChild(this.sprite);
        }
        displayObject.addChild(this.sprite = new Pixi.Sprite(this._texture));

        this.sprite.anchor = new Point(0.5, 0.5);
    }

    get position() {
        return this.sprite.position;
    }
    set position(point) {
        this.sprite.position = point;
        return point;
    }

    get rotation() {
        return this.sprite.rotation;
    }
    set rotation(value) {
        this.sprite.rotation = value;
        return value;
    }

    get anchor() {
        return this.sprite.anchor;
    }
    set anchor(point) {
        this.sprite.anchor = point;
        return point;
    }

    get scale() {
        return this.sprite.scale;
    }
    set scale(point) {
        this.sprite.scale = point;
        return point;
    }

    get width() {
        return this.sprite.width;
    }
    set width(value) {
        this.sprite.width = value;
        return value;
    }

    get height() {
        return this.sprite.height;
    }
    set height(value) {
        this.sprite.height = value;
        return value;
    }

    get texture() {
        return this.texture;
    }
    set texture(texture) {
        this.sprite.texture = texture;
        return texture;
    }

    static fromImage(url) {
        return new Sprite(Pixi.Texture.fromImage(url));
    }
}
