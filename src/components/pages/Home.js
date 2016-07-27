import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';

import PlayerStore from 'stores/PlayerStore';

@connectToStores([PlayerStore], (context, props) => ({
    playerPosition: context.getStore(PlayerStore).transform.position
}))
export default class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Bamboo - Position: {this.props.playerPosition.toString()}</h1>
                <canvas id="gameCanvas"></canvas>
            </div>
        );
    }
}
