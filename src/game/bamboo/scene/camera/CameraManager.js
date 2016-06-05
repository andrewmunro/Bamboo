import {Loader} from 'pixi.js';

import GameObject from '../../entity/GameObject';
import Camera from './Camera';
import {fullscreen} from './Cameras';
import {isType} from '../../helpers/TypeHelpers';

export default class CameraManager extends GameObject {
    constructor(scene, cameras) {
        super('CameraManager', scene);

        if(!cameras) {
            cameras = fullscreen();
        }

        cameras.forEach(c => this.addCamera(c));
    }

    addCamera(camera) {
        if(!isType(camera, Camera)) {
            throw new Error('Expected addCamera to be called with a Camera');
        }

        this.addComponent(camera);
    }

    removeCamera(camera) {
        this.removeComponent(camera);
    }

    get cameras() {
        return this.getComponents(Camera);
    }

    get activeCameras() {
        return cameras.filter(c => c.active);
    }
}
