export function clientOnly(target, key, descriptor) {
    let fn = descriptor.value;

    if (typeof fn !== 'function') {
        throw new Error(`@clientOnly decorator can only be applied to methods not: ${typeof fn}`);
    }

    return {
        configurable: true,
        get() {
            return typeof(window) !== "undefined" ? fn : function() {};
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
            return typeof(window) === "undefined" ? fn : function() {};
        }
    };
};
