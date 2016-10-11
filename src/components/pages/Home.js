import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';

import TitleScene from 'components/scenes/TitleScene';

import SceneStore from 'stores/SceneStore';

@connectToStores([SceneStore], (context, props) => ({
    currentScene: context.getStore(SceneStore).currentScene
}));
export default class Home extends React.Component {
    render() {
        let sceneViews = {
            'TitleScene': TitleScene
        };

        if(this.props.currentScene) console.log(this.props.currentScene.id);

        let sceneView = this.props.currentScene ? sceneViews[this.props.currentScene.id] : null;

        return (
            <div>
                <canvas id="gameCanvas"></canvas>
                {sceneView ? React.createElement(sceneView) : null}
            </div>
        );
    }
}
