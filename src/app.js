import 'babel-polyfill';

import Fluxible from 'fluxible';
import Router from 'components/Router';

import {clientOnly, serverOnly} from 'utils/Decorators';

class AppFactory {
    constructor() {
        this.app = new Fluxible({
            component: Router,
            stores: [
                require('stores/PageStore'),
                require('stores/PlayerStore')
            ]
        });

        this.initClientApp();
        this.initServerApp();
    }

    @clientOnly
    initClientApp() {
        console.log('Registering client app');
        this.app.plug(require('plugins/SocketPlugin'));
    }

    @serverOnly
    initServerApp() {
        console.log('Registering server app');
    }
}

const factory = new AppFactory();

export default factory.app;
