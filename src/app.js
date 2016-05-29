import 'babel-polyfill';

import Fluxible from 'fluxible';
import Router from 'components/Router';

const app = new Fluxible({
    component: Router,
    stores: [
        require('stores/PageStore'),
        require('stores/PlayerStore')
    ],
    plugins: [
        require('plugins/SocketPlugin')
    ]
});

export default app;
