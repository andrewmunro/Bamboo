import {Point} from 'pixi';

export default class Vector2 extends Point {
    static zero() {
        return new Vector2();
    }

    static one() {
        return new Vector2(1, 1);
    }

    static half() {
        return new Vector2(0.5, 0.5);
    }

    static up() {
        return new Vector2(0, -1);
    }

    static down() {
        return new Vector2(0, 1);
    }

    static left() {
        return new Vector2(-1, 0);
    }

    static right() {
        return new Vector2(1, 0);
    }

    static equal(value) {
        return new Vector2(value, value);
    }

    add(value) {
        return new Vector2(this.x + (value.x || value), this.y + (value.y || value));
    }

    sub(value) {
        return new Vector2(this.x - (value.x || value), this.y - (value.y || value));
    }

    multi(value) {
        return new Vector2(this.x * (value.x || value), this.y * (value.y || value));
    }

    dev(value) {
        return new Vector2(this.x / (value.x || value), this.y / (value.y || value));
    }

    distance(vector2) {
        return Math.sqrt(Math.pow(this.x - vector2.x, 2) + Math.pow(this.y - vector2.y, 2));
    }

    angle(vector2) {
        return Math.atan(this.y - vector2.y, this.x - vector2.x);
    }

    toString() {
        return `x: ${this.x}, y: ${this.y}`;
    }
}
