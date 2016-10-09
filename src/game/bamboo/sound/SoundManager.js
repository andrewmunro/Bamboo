import {clientOnly, serverOnly} from 'utils/Decorators';

export default class SoundManager {
    constructor() {
        this.init();

        this.soundQueue = [];
        this.sounds = {};
    }

    @clientOnly
    init() {
        this.soundManager = require('soundmanager2').soundManager;

        soundManager.setup({
            url: 'sounds',
            onready: () => {
                this.ready = true;

                this.soundQueue.forEach(playSound => this.addSound(...playSound));
                this.soundQueue = [];
            }
        });
    }

    @clientOnly
    addSound(url, playOnReady = false) {
        if(this.ready) {
            this.sounds[url] = soundManager.createSound({
                url
            });

            if(playOnReady) this.sounds[url].play();
        } else {
            this.soundQueue.push(arguments);
        }
    }

    @clientOnly
    playSound(url) {
        if(this.sounds[url]) {
            this.sounds[url].play();
        }
    }
}
