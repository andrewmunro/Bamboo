import React from 'react';
import { Link } from 'react-router';

export default class Nav extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    render() {
        return (
            <ul className="pure-menu pure-menu-horizontal">
                <li className={this.context.router.isActive('/', true) ? 'pure-menu-selected' : ''}>
                    <Link to='/'>Home</Link>
                </li>
            </ul>
        );
    }
}
