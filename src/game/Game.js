import Bamboo from 'game/bamboo/Bamboo';

import TitleScene from 'game/scenes/space/TitleScene';
import SpaceScene from 'game/scenes/space/SpaceScene';

export default class Game extends Bamboo {
    constructor(context, options) {
        super(context, options);

        this.sceneManager.addScene(new TitleScene());
        //this.sceneManager.addScene(new SpaceScene());
    }
}
