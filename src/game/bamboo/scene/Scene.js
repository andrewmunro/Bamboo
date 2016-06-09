import {loaders} from 'pixi';
import {List} from 'immutable';

import GameObject from '../entity/GameObject';
import DisplayObject from '../component/DisplayObject';
import CameraManager from './camera/CameraManager';

export default class Scene extends GameObject {
    constructor(id = "Scene", cameras = null) {
        super(id);

        this.loader = new loaders.Loader();
        this.cameraManager = new CameraManager(this, cameras);

        this.addComponent(this.displayObject = new DisplayObject(id));
        this.enabled = false;
    }

    prerender(camera) {

    }
}
