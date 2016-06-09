import platformHelper from 'helpers/PlatformHelper';

export class Input {
    constructor() {
        if(platformHelper.isClient()) {
            window.addEventListener('keydown', event => this.onKeyDown(event));
            window.addEventListener('keyup', event => this.onKeyUp(event));
        }

        this.keysDown = {};
    }

    getKey(keyCode) {
        return keyCode in this.keysDown;
    }

    getKeyDown(keyCode) {
        return this.keysDown[keyCode] === 'keyDown';
    }

    getKeyUp(keyCode) {
        return this.keysDown[keyCode] === 'keyUp';
    }

    onKeyDown({keyCode}) {
        this.keysDown[keyCode] = this.getKey(keyCode) ? null : 'keyDown';
    }

    onKeyUp({keyCode}) {
        this.keysDown[keyCode] = 'keyUp';
    }

    postUpdate(dt) {
        // Remove any keys that have been key-ed up!
        Object.keys(this.keysDown).forEach(key => {
            if(this.getKeyDown(key)) this.keysDown[key] = null;
            if(this.getKeyUp(key)) delete this.keysDown[key];
        });
    }
}

export default new Input();
