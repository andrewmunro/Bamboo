export default (actionContext, scene, done) => {
    actionContext.dispatch('CHANGE_SCENE', scene);
}
