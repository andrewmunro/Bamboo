import 'babel-polyfill';

import Fluxible from 'fluxible';
import Router from 'components/Router';

import {clientOnly, serverOnly} from 'utils/Decorators';

export class AppFactory {
    constructor() {
        this.app = new Fluxible({
            component: Router,
            stores: [
                require('stores/PageStore'),
                require('stores/SceneStore'),
                require('stores/PlayerStore'),
            ]
        });

        this.app.plug(require('plugins/SocketPlugin'));
        this.app.plug(require('plugins/PlatformPlugin'));

        this.initClientApp();
        this.initServerApp();
    }

    @clientOnly
    initClientApp() {
        console.log('Registering client app');
    }

    @serverOnly
    initServerApp() {
        console.log('Registering server app');
    }
}

const factory = new AppFactory();

export default factory.app;
