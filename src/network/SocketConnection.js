class SocketConnection {
    constructor() {
        this.socket = require('socket.io-client')('http://localhost:3000');

        this.socket.on('connect', () => {
            console.log('connected!');
        });

        this.handlers = {};
    }

    register(actionContext) {
        this.context = actionContext;

        this.socket.on('event', this.handleEvent.bind(this));
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
        // console.log(`Emitting ${event} with payload: ${payload}`);
        this.socket.emit('event', {
            event,
            payload
        });
    }
}

export default new SocketConnection();
