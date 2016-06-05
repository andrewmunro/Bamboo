import {Point} from 'pixi.js';

import Component from './Component';

export default class Transform extends Component {
    static componentName = 'Transform'

    constructor(parent) {
        super();

        this.position = new Point();
        this.rotation = 0;
        this.scale = new Point(1, 1);
        this.anchor = new Point(0.5, 0.5);
        this.parent = parent;
    }
}
