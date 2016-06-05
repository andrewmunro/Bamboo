import {loaders} from 'pixi.js';
import {List} from 'immutable';

import GameObject from '../entity/GameObject';
import DisplayObject from '../component/DisplayObject';
import CameraManager from './camera/CameraManager';

export default class Scene extends GameObject {
    constructor(id = "Scene", parent = null) {
        super(id, parent);

        this.loader = new loaders.Loader();
        this.cameraManager = new CameraManager(this);
        super.addComponent(this.displayObject = new DisplayObject());

        this.enabled = false;
    }

    prerender(camera) {

    }
}
