import React from 'react';
import Nav from 'components/Nav';
import Bamboo from 'game/bamboo/Bamboo';

export default class Application extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.muted = false;

        this.state = {
            muteImage: '/images/mute-button.svg'
        }
    }

    toggleFullscreen(event) {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }

        event.target.blur();
    }

    toggleMute(event) {
        if(this.muted) {
            Bamboo.instance.soundManager.soundManager.unmute();
        } else {
            Bamboo.instance.soundManager.soundManager.mute();
        }

        this.setState({
            muteImage: this.muted ? '/images/mute-button.svg' : '/images/unmute-button.svg'
        });

        this.muted = !this.muted;

        event.target.blur();
    }

    render() {
        return (
            <div>
                <button className='toggle-fullscreen-btn' onClick={(event) => this.toggleFullscreen(event)} ></button>
                <button className='toggle-sound-btn' onClick={(event) => this.toggleMute(event)} >
                    <image src={this.state.muteImage}/>
                </button>
                {this.props.children}
            </div>
        );
    }
}
