import Component from 'game/entity/Component';

export function isComponent(component) {
    let prototype = component.prototype || Object.getPrototypeOf(component);
    return prototype instanceof Component;
}
