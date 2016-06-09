export class PlatformHelper {
    isClient() {
        return !this.isServer();
    }

    isServer() {
        return typeof(window) === "undefined";
    }
}

export default new PlatformHelper();
