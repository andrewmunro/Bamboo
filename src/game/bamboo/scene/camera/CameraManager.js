import {Container} from 'pixi';

import GameObject from '../../entity/GameObject';
import DisplayObject from '../../component/DisplayObject';
import Camera from './Camera';
import {fullscreen} from './Cameras';
import {isType} from '../../helpers/TypeHelpers';

export default class CameraManager extends GameObject {
    constructor(scene, cameras) {
        super('CameraManager', scene);

        this.addComponent(this.displayObject = new DisplayObject('CameraManager'));

        if(!cameras) {
            cameras = fullscreen();
        }

        cameras.forEach(c => this.addCamera(c));
    }

    addCamera(camera) {
        if(!isType(camera, Camera)) {
            throw new Error('Expected addCamera to be called with a Camera');
        }

        camera.enabled = true;
        this.addComponent(camera);
        this.displayObject.addChild(camera);
    }

    removeCamera(camera) {
        camera.enabled = false;
        this.removeComponent(camera);
        this.displayObject.removeChild(camera);
    }

    get cameras() {
        return this.getComponents(Camera);
    }

    get activeCameras() {
        return cameras.filter(c => c.enabled);
    }
}
