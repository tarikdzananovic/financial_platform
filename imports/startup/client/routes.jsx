import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import App from '../../ui/layouts/App.jsx';
import Index from '../../ui/pages/Index.jsx';
import Signup from '../../ui/pages/Signup.jsx';
import Login from '../../ui/pages/Login.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';


Meteor.startup(() => {
    render(
        <Router history={ browserHistory }>
            <Route path="/" component={ App }>
                <IndexRoute name="index" component={ Index } />
                <Route name="signup" path="/signup" component={ Signup } />
                <Route name="login" path="/login" component={ Login } />
                <Route path="*" component={ NotFound } />
            </Route>
        </Router>,
        document.getElementById('react-root')
    );
});


