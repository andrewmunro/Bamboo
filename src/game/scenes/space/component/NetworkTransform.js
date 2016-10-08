import Component from 'game/bamboo/component/Component';

export default class NetworkTransform extends Component {
    constructor(owner = 'server') {
        this.owner = owner;
    }

    update(dt) {
        if(this.owner = 'server' && this.context.isServer()) {

        }

        if(this.owner = 'client' && this.context.isClient()) {

        }
    }
}
