import GameObject from '../entity/GameObject';
import Component from '../component/Component';

export function isGameObject(gameObject) {
    return isType(gameObject, GameObject);
}

export function isComponent(component) {
    return isType(component, Component);
}

export function isType(typeA, typeB) {
    let prototype = typeA.prototype || Object.getPrototypeOf(typeA);
    return prototype instanceof typeB || typeA instanceof typeB;
}
