class SocketServer {
    constructor() {
        this.server = require('socket.io')(require('network/WebServer'));
        this.server.on('connection', (socket) => this.handleConnection(socket));

        this.handlers = {};
    }

    register(actionContext) {
        console.log('Registering Socket Server');
        this.context = actionContext;
    }

    handleConnection(socket) {
        console.log(`[${socket.id}] Connected`);

        socket.on('event', (event) => this.handleEvent(socket, event));
        socket.on('disconnect', (event) => this.handleDisconnect(socket));
    }

    handleDisconnect(socket) {
        console.log(`[${socket.id}] Disconnected`);
    }

    handleEvent(socket, {event, payload}) {

        payload.sender = socket;

        this.context.dispatch(event, payload);

        if(this.handlers[event]) {
            this.handlers[event].forEach(callback => callback(payload));
        }
    }

    addHandler(event, callback) {
        if(!this.handlers[event]) {
            this.handlers[event] = [];
        }

        this.handlers[event].push(callback);

    }

    emit(event, payload, socket) {
        //console.log(`Emitting ${event} with payload: ${JSON.stringify(payload)}`);

        //let send = socket ? socket.emit.bind(this) : this.server.emit.bind(this);

        //console.log('send' + send);

        this.server.emit('event', {
            event,
            payload
        });
    }
}

export default new SocketServer();
