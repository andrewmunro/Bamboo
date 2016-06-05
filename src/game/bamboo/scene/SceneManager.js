import {List} from 'immutable';

import DisplayObject from '../component/DisplayObject';

export default class SceneManager extends DisplayObject {
    constructor(gameInstance) {
        if(!gameInstance || !gameInstance.stage) {
            throw new Error('SceneManager expected to be constructed with the gameInstance');
        }

        super('SceneManager', gameInstance);
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
            this.removeChild(this.currentScene.displayObject.displayObject);
        }

        this.currentScene = scene;

        let onSceneLoaded = () => {
            this.currentScene.start();
            this.addChild(this.currentScene.displayObject.displayObject);
        }

        if(this.currentScene.loader.loaded) {
			onSceneLoaded();
		} else {
			this.currentScene.loader.once('complete', () => onSceneLoaded());
			this.currentScene.loader.load();
		}
    }
}
