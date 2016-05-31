import vec2 from 'p2';
import _ from 'lodash';
import {List} from 'immutable';

import {isComponent} from 'game/helpers/TypeHelpers'
import Component from 'game/entity/Component';

export default class GameObject {
    constructor() {
        this.components = List();
    }

    addComponent(component) {
        if(component.constructor && component.constructor === Array) {
            _.forEach(component, this.addComponent);
        } else {
            if(!isComponent(component)) {
                throw new Error(`Expected '${component}' to be of type 'Component'`);
            }

            this.components = this.components.push(component.prototype ? new component() : component);
        }
        return this;
    }

    removeComponent(component) {
        let removeable = component;

        if(!isComponent(removeable)) {
            removeable = this.getComponent(component);
        }

        if(removeable) {
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
}
