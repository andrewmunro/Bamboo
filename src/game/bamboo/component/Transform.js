import Vector2 from '../math/Vector2';

import Component from './Component';

export default class Transform extends Component {
    static componentName = 'Transform'

    constructor(parent) {
        super();

        this.parent = parent;
        this.position = Vector2.zero();
        this.rotation = 0;
        this.scale = Vector2.one();
        this.anchor = Vector2.half();
    }

    get globalPosition() {
        return this.parent ? this.parent.globalPosition.add(this.position) : this.position;
    }

    get globalRotation() {
        return this.parent ? this.parent.globalRotation.add(this.rotation) : this.rotation;
    }

    get globalScale() {
        return this.parent ? this.parent.globalScale.multi(this.scale) : this.scale;
    }
}
