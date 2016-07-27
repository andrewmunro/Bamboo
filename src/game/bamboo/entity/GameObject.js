import _ from 'lodash';
import {List} from 'immutable';

import {isComponent, isType} from '../helpers/TypeHelpers'
import Transform from '../component/Transform';

import DisplayObject from '../component/DisplayObject';
import Bamboo from '../Bamboo';

export default class GameObject {
    constructor(id = 'GameObject', parent = null) {
        this.components = List();
        this.id = id;

        this.transform = new Transform(parent ? parent.transform : null);
        this.context = Bamboo.instance.context.getComponentContext();
        this.addComponent(this.transform);

        this.enabled = true;

        Bamboo.instance.preUpdate.add(this.onPreUpdate, this);
        Bamboo.instance.update.add(this.onUpdate, this);
        Bamboo.instance.postUpdate.add(this.onPostUpdate, this);
    }

    addComponent(component) {
        if(component.constructor && component.constructor === Array) {
            _.forEach(component, this.addComponent);
        } else {
            if(!isComponent(component)) {
                throw new Error(`Failed adding component to ${this.id}: Expected '${component}' to be of type 'Component'!`);
            }
            let type = component.prototype || component.constructor;
            if(type.unique && this.getComponent(type)) {
                throw new Error(`Failed adding component to ${this.id}: There can only be one ${type.componentName} added to a GameObject at once!`);
            }

            let comp = component.prototype ? new component() : component;
            comp.gameObject = this;
            this.components = this.components.push(comp);
            comp.start();

            // Add to parent displayobject
            if(this.parent && isType(component, DisplayObject) && this.parent.getComponent(DisplayObject)) {
                // Update displayobject from transform before adding
                component.update();
                this.parent.getComponent(DisplayObject).addChild(component.displayObject);
            }
        }
        return this;
    }

    removeComponent(component) {
        let removeable = component;

        if(!isComponent(removeable)) {
            removeable = this.getComponent(component);
        }

        if(removeable) {
            removeable.gameObject = null;
            this.components = this.components.remove(this.components.indexOf(removeable));
        }

        return this;
    }

    getComponent(component) {
        if(isComponent(component)) {
            return this.components.find(c => c.constructor == component);
        } else if(typeof(component) === 'string') {
            return this.components.find(c => c.constructor.componentName == component);
        } else {
            throw new Error('Expected to be called with a component or string!');
        }
    }

    getComponents(component) {
        if(isComponent(component)) {
            return this.components.filter(c => c.constructor == component).toArray();
        } else if(typeof(component) === 'string') {
            return this.components.filter(c => c.constructor.componentName == component).toArray();
        } else {
            throw new Error('Expected to be called with a component or string!');
        }
    }

    preUpdate(dt) { }
    update(dt) { }
    postUpdate(dt) { }

    onPreUpdate(dt) {
        if(this.enabled) {
            this.preUpdate(dt);
            this.components.forEach(c => {
                if(c.enabled) {
                    c.preUpdate(dt)
                }
            });
        }
    }

    onUpdate(dt) {
        if(this.enabled) {
            this.update(dt);
            this.components.forEach(c => {
                if(c.enabled) {
                    c.update(dt)
                }
            });
        }
    }

    onPostUpdate(dt) {
        if(this.enabled) {
            this.postUpdate(dt);
            this.components.forEach(c => {
                if(c.enabled) {
                    c.postUpdate(dt)
                }
            });
        }
    }

    get parent() {
        return this.transform.parent ? this.transform.parent.gameObject : null;
    }
    set parent(parent) {
        if(parent) {
            this.transform.parent = parent.transform;
        }

        return parent;
    }
}
