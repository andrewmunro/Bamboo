import {Container} from 'pixi.js';

import Component from './Component';

export default class DisplayObject extends Component {
    static componentName = 'DisplayObject'
    static unique = true

    constructor() {
        super();
        this.displayObject = new Container();
    }

    addChild(pixiDisplayObject) {
        this.displayObject.addChild(pixiDisplayObject);
    }

    removeChild(pixiDisplayObject) {
        this.displayObject.removeChild(pixiDisplayObject);
    }

    update(dt) {
        if(this.transform) {
            this.displayObject.pivot = this.transform.anchor;
            this.displayObject.scale = this.transform.scale;
            this.displayObject.position = this.transform.position;
            if(this.displayObject.rotation != this.transform.rotation) {
                this.displayObject.rotation = this.transform.rotation;
            }
        }

        super.update(dt);
    }
}
