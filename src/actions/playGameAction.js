import Bamboo from 'game/bamboo/Bamboo';

export default (context, playerName, done) => {
    context.dispatch('SET_PLAYER_NAME', playerName);

    Bamboo.instance.sceneManager.changeScene('NetworkScene');

    done();
};
