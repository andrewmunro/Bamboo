import {GameObject, DisplayObject, Sprite, Vector2} from 'game/bamboo/Bamboo';
import Pixi, {Point} from 'pixi';

import seedrandom from 'seedrandom';

import PlatformHelper from 'helpers/PlatformHelper';

export default class Planets extends GameObject {
    constructor(parent) {
        super('Planets', parent);
        this.addComponent(this.dp = new DisplayObject('PlanetsContainer'));

        this.addComponent(this.earth = Sprite.fromImage('/sprites/Planets/planet2.png'));

        this.planets = [];

        this.planets.push(Sprite.fromImage('/sprites/Planets/planet1.png'));
        this.planets.push(Sprite.fromImage('/sprites/Planets/planet3.png'));
        this.planets.push(Sprite.fromImage('/sprites/Planets/planet4.png'));
        this.planets.push(Sprite.fromImage('/sprites/Planets/planet5.png'));
        this.planets.push(Sprite.fromImage('/sprites/Planets/planet6.png'));
        this.planets.push(Sprite.fromImage('/sprites/Planets/planet7.png'));
        this.planets.push(Sprite.fromImage('/sprites/Planets/planet8.png'));
        this.planets.push(Sprite.fromImage('/sprites/Planets/planet9.png'));
        this.planets.push(Sprite.fromImage('/sprites/Planets/planet10.png'));

        var random = seedrandom('hello.');

        this.planets.forEach(planet => {
            let x = (random() * 3000) - 1500;
            let y = (random() * 3000) - 1500;

            this.addComponent(planet);
            planet.position = new Point(x, y);
        });

        this.transform.scale = Vector2.equal(2, 2);
    }

    update(dt) {
        //this.transform.rotation += 0.01;
    }
}
