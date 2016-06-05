export default class Component {
    constructor() {
        this.enabled = true;
    }

    //On added to GameObject
    start() {

    }

    // On update
    update(dt) {

    }

    get transform() {
        return this.gameObject ? this.gameObject.transform : null;
    }
}
