import {GameObject, DisplayObject, Sprite} from 'game/bamboo/Bamboo';

import Vector2 from 'game/bamboo/math/Vector2';

import Input from 'game/bamboo/input/Input';
import Key from 'game/bamboo/input/Key';

import connectGameObjectToStores from 'utils/connectGameObjectToStores';
import PlayerStore from 'stores/PlayerStore';

import {moveLeft, moveRight, moveUp, moveDown} from 'actions/player/moveActions';
import Bamboo from 'game/bamboo/Bamboo';

@connectGameObjectToStores([PlayerStore], cat => ({
        PlayerStore: (playerStore, context) => {
            cat.updateTransform(playerStore.transform);
        }
    })
)
export default class Cat extends GameObject {
    constructor(parent) {
        super('Cat', parent);
        this.addComponent(this.dp = new DisplayObject('CatContainer'));

        this.addComponent(this.cat = Sprite.fromImage('https://c1.staticflickr.com/3/2389/2073509907_345ad52bc1.jpg'));
        this.addComponent(this.mouthPiece = Sprite.fromImage('https://media1.giphy.com/media/GWIpvD12KeoE/200_s.gif'));
        this.mouthPiece.position = new Vector2(20, -50);

        this.transform.scale = Vector2.equal(0.5);

        // Set initial position
        this.updateTransform(this.context.getStore(PlayerStore).transform);
    }

    updateTransform(storeTransform) {
        this.transform.position = storeTransform.position;
        this.transform.rotation = storeTransform.rotation;
    }

    update(dt) {
        if(Input.getKey(Key.W)) {
            this.context.executeAction(moveUp);
        }

        if(Input.getKey(Key.S)) {
            this.context.executeAction(moveDown);
        }

        if(Input.getKey(Key.A)) {
            this.context.executeAction(moveLeft);
        }

        if(Input.getKey(Key.D)) {
            this.context.executeAction(moveRight);
        }

        if(this.spinning) {
            this.transform.rotation += 0.1;
        }

        if(Input.getKeyDown(Key.SPACE)) {
            this.spinning = true;

            if(this.timeout) clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {
                this.spinning = false;
                this.timeout = null;
            }, 1000);
        }
    }
}
