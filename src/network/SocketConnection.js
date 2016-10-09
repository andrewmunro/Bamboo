class SocketConnection {
    constructor() {
        this.socket = require('socket.io-client')(`${window.location.origin}`);

        this.messageQueue = [];

        this.socket.on('connect', () => {
            console.log('connected!');
            this.messageQueue.forEach(message => this.emit(...message));
            this.messageQueue = [];
        });

        this.handlers = {};
    }

    register(actionContext) {
        this.context = actionContext;

        this.socket.on('event', this.handleEvent.bind(this));
        this.socket.on('disconnected', this.handleDisconnect)
    }

    handleDisconnect() {
        console.log(`Disconnected!`);
    }

    handleEvent({event, payload}) {
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

    emit(event, payload) {
        if(this.socket.disconnected) {
            this.messageQueue.push(arguments);
        } else {
            // console.log(`Emitting ${event} with payload: ${payload}`);
            this.socket.emit('event', {
                event,
                payload
            });
        }
    }
}

export default new SocketConnection();
