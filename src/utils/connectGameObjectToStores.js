import Bamboo, {TypeHelpers} from 'game/bamboo/Bamboo';

export function connectGameObjectToStores(gameObject, stores, getStateFromStores) {
    if(!TypeHelpers.isGameObject(gameObject)) {
        throw new Error(`Cannot connect ${GameObject} to stores`);
    }

    let onStoreChange = () => {
        if(GameObject.enabled) {
            
        }
    };

    stores.forEach(store => {
        let context = Bamboo.instance.context.getActionContext();

        this.context.getStore(store).on('change', onStoreChange);
    });
}
