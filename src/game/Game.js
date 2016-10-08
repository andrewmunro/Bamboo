import Bamboo, {GameObject, Transform} from 'game/bamboo/Bamboo';

import TestScene from 'game/scenes/TestScene';
import SpaceScene from 'game/scenes/space/SpaceScene';

export default class Game extends Bamboo {
    constructor(context, options) {
        super(context, options);

        //this.sceneManager.addScene(new TestScene());
        this.sceneManager.addScene(new SpaceScene());
    }
}
