import platformHelper from 'helpers/PlatformHelper';

export function clientOnly(target, key, descriptor) {
    let fn = descriptor.value;

    if (typeof fn !== 'function') {
        throw new Error(`@clientOnly decorator can only be applied to methods not: ${typeof fn}`);
    }

    return {
        configurable: true,
        get() {
            return platformHelper.isClient() ? fn : function() {};
        }
    };
};

export function serverOnly(target, key, descriptor) {
    let fn = descriptor.value;

    if (typeof fn !== 'function') {
        throw new Error(`@serverOnly decorator can only be applied to methods not: ${typeof fn}`);
    }

    return {
        configurable: true,
        get() {
            return platformHelper.isServer() ? fn : function() {};
        }
    };
};
