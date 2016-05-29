import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from 'components/App';
import Home from 'components/pages/Home';
import NotFound from 'components/pages/NotFound';

export default (
    <Route name="app" path="/" component={App}>
        <IndexRoute name="home" component={Home} />
        <Route path="*" component={NotFound}/>
    </Route>
);
