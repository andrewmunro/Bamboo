import React from 'react';
import playGameAction from 'actions/playGameAction';

export default class TitleScene extends React.Component {
    static contextTypes = {
        executeAction: React.PropTypes.func,
    }

    onKeyPress(e) {
        if(e.key === 'Enter') {
            this.context.executeAction(playGameAction, e.target.value)
        }
    }

    render() {
        return (
            <div className='title-scene'>
                <span>Enter Your name:</span>
                <input autoFocus type='text' name='player-name' onKeyPress={(event) => this.onKeyPress(event)} />
            </div>
        )
    }
}
