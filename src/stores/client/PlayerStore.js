import BaseStore from 'fluxible/addons/BaseStore';

import {Vector2} from 'game/bamboo/Bamboo';

export default class PlayerStore extends BaseStore {
    static storeName = 'PlayerStore'

    static handlers = {
        'UPDATE_TRANSFORM': 'updateTransform'
    }

    constructor(dispatcher) {
        super(dispatcher);

        this.transform = {
            position: new Vector2(512, 334),
            rotation: 0,
            scale: Vector2.one()
        }
    }

    updateTransform({position, rotation, scale}) {
        this.transform.position = position ? new Vector2(position.x + this.transform.position.x, position.y + this.transform.position.y) : this.transform.position;
        this.transform.rotation = rotation || this.transform.rotation;
        this.transform.scale = scale ? new Vector2(scale.x, scale.y) : this.transform.scale;

        this.emitChange(this.transform);
    }
}
