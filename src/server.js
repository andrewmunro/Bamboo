import server from 'network/WebServer';
import app from 'app';
import Game from 'game/Game';

let game = new Game(app.createContext(), {
    width: 1280,
    height: 720
});

if(process.env.sourceMap) {
    require('source-map-support').install();
}

const port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server accepting connections on port ${port}`);

if(process.send) {
    process.send('ready');
}
