import {List} from 'immutable';

import DisplayObject from '../component/DisplayObject';

export default class SceneManager extends DisplayObject {
    constructor() {
        super('SceneManager');
        this.scenes = new List();
    }

    addScene(scene) {
        this.scenes = this.scenes.push(scene);

        if(!this.currentScene) {
            this.changeScene(scene.id);
        }
    }

    getScene(sceneId) {
        return this.scenes.find(s => s.id == sceneId);
    }

    removeScene(sceneId) {
        let scene = this.getScene(sceneId);
        if(!scene) {
            throw new Error(`Failed to remove scene ${sceneId}. It was not found in the SceneManager.`);
        }

        this.scenes = this.scenes.remove(this.scenes.indexOf(scene));
    }

    changeScene(sceneId) {
        let scene = this.getScene(sceneId);
        if(!scene) {
            throw new Error(`Failed to change scene to ${sceneId}. It was not found in the SceneManager.`);
        }

        if(this.currentScene) {
            this.currentScene.enabled = false;
            this.removeChild(this.currentScene.cameraManager.displayObject);
        }

        this.currentScene = scene;

        let onSceneLoaded = () => {
            this.currentScene.enabled = true;
            this.currentScene.start();
            this.addChild(this.currentScene.cameraManager.displayObject);
        }

        if(this.currentScene.loader.loaded) {
			onSceneLoaded();
		} else {
			this.currentScene.loader.once('complete', () => onSceneLoaded());
			this.currentScene.loader.load();
		}
    }
}
