import platformHelper from 'helpers/PlatformHelper';

export default {
    name: 'PlatformPlugin',
    plugContext() {
        return {
            plugComponentContext(context) {
                context.isClient = platformHelper.isClient.bind(platformHelper);
                context.isServer = platformHelper.isServer.bind(platformHelper);
            },
            plugActionContext(context) {
                context.isClient = platformHelper.isClient.bind(platformHelper);
                context.isServer = platformHelper.isServer.bind(platformHelper);
            },
            plugStoreContext(context) {
                context.isClient = platformHelper.isClient.bind(platformHelper);
                context.isServer = platformHelper.isServer.bind(platformHelper);
            }
        }
    }
}
