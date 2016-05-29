import React from 'react';
import Nav from 'components/Nav';

export default class Application extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <Nav />
                {this.props.children}
            </div>
        );
    }
}
