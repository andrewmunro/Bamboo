import io from 'socket.io-client';

export class SocketConnection {
    constructor() {
        this.socket = io('https://localhost:3000');

        this.socket.on('connect', function() {
            console.log('connected!');
        });
    }

    register(actionContext) {
        this.context = actionContext;

        this.socket.on('dispatch', this.handleDispatch.bind(this));
        this.socket.on('executeAction', this.handleExecuteAction.bind(this));
    }

    handleDispatch({event, payload}) {
        this.context.dispatch(event, payload);
    }

    handleExecuteAction({action, payload}) {
        this.context.executeAction(action, payload);
    }

    emit(data) {
        this.socket.emit(data);
    }
}

export default {
    name: 'SocketPlugin',
    plugContext() {
        const connection = new SocketConnection();

        return {
            plugComponentContext(context) {
                context.emit = connection.emit.bind(connection);
            },
            plugActionContext(context) {
                connection.register(context);
                context.emit = connection.emit.bind(connection);
            },
            plugStoreContext(context) {
                context.emit = connection.emit.bind(connection);
            }
        }
    }
}
