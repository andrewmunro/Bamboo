export default class Component {
    constructor() {
        this.enabled = true;
    }

    //On added to GameObject
    start() {

    }

    destroy() {}

    preUpdate(dt) { }
    update(dt) { }
    postUpdate(dt) { }

    get transform() {
        return this.gameObject ? this.gameObject.transform : null;
    }

    get context() {
        return this.gameObject ? this.gameObject.context : null;
    }
}
