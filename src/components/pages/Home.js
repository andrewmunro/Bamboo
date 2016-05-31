import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Space Game</h1>
                <canvas id="gameCanvas"></canvas>
            </div>
        );
    }
}
