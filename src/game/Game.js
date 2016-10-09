import Bamboo from 'game/bamboo/Bamboo';
import {clientOnly, serverOnly} from 'utils/Decorators';

import TitleScene from 'game/scenes/title/TitleScene';
import NetworkScene from 'game/scenes/space/NetworkScene';
import SpaceScene from 'game/scenes/space/SpaceScene';

export default class Game extends Bamboo {
    constructor(context, options) {
        super(context, options);

        if(this.context.getComponentContext().isClient()) {
            this.sceneManager.addScene(new TitleScene());
        }

        this.sceneManager.addScene(new NetworkScene());
        //this.sceneManager.addScene(new SpaceScene());

        this.startMusic();
    }

    @clientOnly
    startMusic() {
        let soundManager = require('soundmanager2').soundManager;

        soundManager.setup({
            url: 'sounds',
            onready: () => {
                let music = soundManager.createSound({
                    url: '/sounds/constellations.mp3'
                });

                music.play();
            }
        });
    }
}
