import Bamboo, {isGameObject} from 'game/bamboo/Bamboo';

function connectGameObjectToStores(GameObject, stores, getStateFromStores) {
    if(!isGameObject(GameObject)) {
        throw new Error(`Cannot connect ${GameObject} to stores. Must be a GameObject.`);
    }

    let onStoreChange = (store, gameObject) => {
        if(gameObject.enabled) {
            let handlers = getStateFromStores(gameObject);

            if(!handlers[store.storeName]) {
                throw new Error(`Recieved change for ${store.storeName} but no handler was found in ${gameObject.id}'s connectGameObjectToStores'`)
            }

            let context = Bamboo.instance.context.getComponentContext();
            handlers[store.storeName](context.getStore(store), context);
        }
    }

    class GameObjectStoreConnector extends GameObject {
        constructor() {
            super(...arguments);

            let context = Bamboo.instance.context.getComponentContext();

            stores.forEach(store => {
                context.getStore(store).on('change', () => onStoreChange(store, this));
            });
        }
    }

    return GameObjectStoreConnector;
}

export default function decorate(...args) {
    return function(GameObject) {
        return connectGameObjectToStores(GameObject, ...args)
    }
}
