import platformHelper from 'helpers/PlatformHelper';
import {clientOnly, serverOnly} from 'utils/Decorators';

export default {
    name: 'SocketPlugin',
    plugContext() {
        const connection = platformHelper.isServer() ? require('network/SocketServer') : require('network/SocketConnection');

        return {
            plugComponentContext(context) {
                context.emit = connection.emit.bind(connection);
                context.handle = connection.addHandler.bind(connection);
            },

            plugActionContext(context) {
                connection.register(context);
                context.emit = connection.emit.bind(connection);
                context.handle = connection.addHandler.bind(connection);
            },
            plugStoreContext(context) {
                context.emit = connection.emit.bind(connection);
                context.handle = connection.addHandler.bind(connection);
            }
        }
    }
}
