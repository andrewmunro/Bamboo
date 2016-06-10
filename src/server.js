import path from 'path';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import serve from 'koa-static';

import serialize from 'serialize-javascript';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';

import app from 'app';
import navigateAction from 'actions/navigateAction';
import HtmlComponent from 'components/Html';

const koa = new Koa();
const server = require('http').createServer(koa.callback());
const io = require('socket.io')(server);

import Game from 'game/Game';
let game = new Game(app.createContext(), {
    width: 1024,
    height: 768
});

if(process.env.sourceMap) {
    require('source-map-support').install();
}

//TODO Find better alternative for Koa@2
koa.use(serve('./public'));
koa.use(serve('./build'));
koa.use(bodyParser());
koa.use(logger());

koa.use(async (ctx, next) => {
    return new Promise((resolve, reject) => {
        match({routes: app.getComponent(), location: ctx.url}, (error, redirectLocation, renderProps) => {
            if (error) {
                reject(error);
            } else if (redirectLocation) {
                ctx.redirect(redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
                const context = app.createContext();
                context.executeAction(navigateAction, {path: ctx.url}, () => {
                    const exposed = `window.App=${serialize(app.dehydrate(context))};`;
                    const markup = ReactDOM.renderToString(
                        <FluxibleComponent context={context.getComponentContext()}>
                            <RouterContext {...renderProps} />
                        </FluxibleComponent>
                    );
                    const htmlElement = React.createElement(HtmlComponent, {
                        clientFile: 'client.js',
                        context: context.getComponentContext(),
                        state: exposed,
                        markup: markup
                    });
                    const html = ReactDOM.renderToStaticMarkup(htmlElement);

                    resolve(html);
                });
            } else {
              next();
            }
        });
    }).then(result => {
        ctx.response.body = '<!DOCTYPE html>' + result;
        ctx.response.type = 'html';
    }).catch(error => {
        ctx.throw(error.message, 500);
    });
});

io.on('connection', function(socket){
    console.log('connected: ' + socket.id);

    socket.on('event', function(data) {
        console.log(data);
    });

    socket.on('disconnect', function(){
        console.log("disconnected: " + socket.id);
    });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server accepting connections on port ${port}`);

if(process.send) {
    process.send('ready');
}

export default server;
