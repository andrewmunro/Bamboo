
import React from 'react';
import ReactDOM from 'react-dom';
import app from 'app';
import { Router, browserHistory } from 'react-router';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';

import Game from 'game/Game';

const dehydratedState = window.App; // Sent from the server

function RenderApp(context) {
    const mountNode = document.getElementById('app');

    ReactDOM.render(
        <FluxibleComponent context={context.getComponentContext()}>
            <Router routes={context.getComponent()} history={browserHistory} />
        </FluxibleComponent>,
        mountNode
    );
}

app.rehydrate(dehydratedState, (err, context) => {
    if (err) throw err;
    window.context = context;

    //Lazy load the context
    context.getActionContext();
    context.getStoreContext();
    context.getComponentContext();

    RenderApp(context);

    window.game = new Game(context, {
        width: 1024,
        height: 768
    });
});
