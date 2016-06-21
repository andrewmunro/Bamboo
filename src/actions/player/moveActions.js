export function moveLeft(actionContext, payload, done) {
    actionContext.dispatch('UPDATE_TRANSFORM', {
        position: {
            x: -5,
            y: 0
        }
    });
    done();
};

export function moveRight(actionContext, payload, done) {
    actionContext.dispatch('UPDATE_TRANSFORM', {
        position: {
            x: 5,
            y: 0
        }
    });
    done();
};

export function moveUp(actionContext, payload, done) {
    actionContext.dispatch('UPDATE_TRANSFORM', {
        position: {
            x: 0,
            y: -5
        }
    });
    done();
};

export function moveDown(actionContext, payload, done) {
    actionContext.dispatch('UPDATE_TRANSFORM', {
        position: {
            x: 0,
            y: 5
        }
    });
    done();
};
