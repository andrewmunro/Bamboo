import BaseStore from 'fluxible/addons/BaseStore';

export default class PageStore extends BaseStore {
    static storeName = 'PageStore'

    static handlers = {
        'CHANGE_ROUTE': 'handleNavigate'
    }

    constructor(dispatcher) {
        super(dispatcher);

        this.currentRoute = null;
    }

    handleNavigate(route) {
        if (this.currentRoute && route.path === this.currentRoute.path) {
            return;
        }

        this.currentRoute = route;
        this.emitChange();
    }

    getState() {
        return {
            route: this.currentRoute
        }
    }

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.currentRoute = state.route;
    }
}
