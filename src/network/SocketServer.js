import msgpack from 'msgpack-lite';

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

    handleDisconnect({id}) {
        console.log(`[${id}] Disconnected`);

        if(this.handlers['disconnect']) {
            this.handlers['disconnect'].forEach(callback => callback({id}));
        }
    }

    handleEvent(socket, {data}) {
        //console.log(`Recieved ${event} with payload: ${JSON.stringify(payload)}`);
        if(data && data.length > 0) {
            let {event, payload} = msgpack.decode(data);
            payload.sender = socket.id;

            this.context.dispatch(event, payload);

            if(this.handlers[event]) {
                this.handlers[event].forEach(callback => callback(payload));
            }
        }
    }

    addHandler(event, callback) {
        if(!this.handlers[event]) {
            this.handlers[event] = [];
        }

        this.handlers[event].push(callback);
    }

    emit(event, payload, socketId) {
        //console.log(`Emitting ${event} with payload: ${JSON.stringify(payload)}`);

        if(socketId) {
            let socket = this.server.sockets.connected[socketId];

            if(socket) {
                socket.emit('event',  msgpack.encode({ event, payload }));
            } else {
                throw new Error(`Couldn't find socket ${socketId}`);
            }
        } else {
            this.server.emit('event', msgpack.encode({
                event,
                payload
            }));
        }
    }
}

export default new SocketServer();
