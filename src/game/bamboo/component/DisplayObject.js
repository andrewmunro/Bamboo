import {Container} from 'pixi';

import Component from './Component';

export default class DisplayObject extends Component {
    static componentName = 'DisplayObject'
    static unique = true

    constructor(id = 'displayObject') {
        super();
        this.displayObject = new Container();
        this.displayObject.id = id;
    }

    addChild(displayObject) {
        this.displayObject.addChild(displayObject.displayObject || displayObject);
    }

    removeChild(pixiDisplayObject) {
        this.displayObject.removeChild(displayObject.displayObject || displayObject);
    }

    preUpdate(dt) {
        if(this.transform) {
            this.displayObject.pivot = this.transform.anchor;
            this.displayObject.scale = this.transform.scale;
            this.displayObject.position = this.transform.position;
            if(this.displayObject.rotation != this.transform.rotation) {
                this.displayObject.rotation = this.transform.rotation;
            }
        }

        super.preUpdate(dt);
    }
}
