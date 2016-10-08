import BaseStore from 'fluxible/addons/BaseStore';

export default class SceneStore extends BaseStore {
    static storeName = 'SceneStore'

    static handlers = {
        'CHANGE_SCENE': 'handleChangeScene'
    }

    constructor(dispatcher) {
        super(dispatcher);

        this.currentScene = null;
    }

    handleChangeScene(scene) {
        this.currentScene = scene;
        this.emitChange();
    }
}
