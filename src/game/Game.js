import Bamboo from 'game/Bamboo';

import TestScene from 'game/scenes/TestScene';

import GameObject from 'game/entity/GameObject';
import Transform from 'game/entity/Transform';

export default class Game extends Bamboo {
    constructor(context, options) {
        super(context, options);

        //this.addScene(new TestScene());

        let go = new GameObject();
        go.addComponent(new Transform());
        console.log(go.getComponent(Transform));
        console.log(go.getComponent("Transform"));
        
        go.addComponent(new Transform());
        console.log(go.getComponents("Transform"));
    }
}
