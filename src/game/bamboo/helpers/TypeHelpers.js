import Component from '../component/Component';

export function isComponent(component) {
    return isType(component, Component);
}

export function isType(typeA, typeB) {
    let prototype = typeA.prototype || Object.getPrototypeOf(typeA);
    return prototype instanceof typeB || typeA instanceof typeB;
}
