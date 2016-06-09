export default class Component {
    constructor() {
        this.enabled = true;
    }

    //On added to GameObject
    start() {

    }

    preUpdate(dt) { }
    update(dt) { }
    postUpdate(dt) { }

    get transform() {
        return this.gameObject ? this.gameObject.transform : null;
    }
}
