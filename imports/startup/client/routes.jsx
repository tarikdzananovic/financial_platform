import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import App from '../../ui/layouts/App.jsx';
import Index from '../../ui/layouts/Index.jsx';
import Signup from '../../ui/pages/Signup.jsx';
import Login from '../../ui/pages/Login.jsx';
import RecoverPassword from '../../ui/pages/RecoverPassword.jsx';
import ResetPassword from '../../ui/pages/ResetPassword.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';

const authenticate = (nextState, replace) => {
    if (!Meteor.loggingIn() && !Meteor.userId()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname },
        });
    }
};


Meteor.startup(() => {
    render(
        <Router history={ browserHistory }>
            <Route path="/" component={ App }>
                <IndexRoute name="index" component={ Index } />
                <Route name="signup" path="/signup" component={ Signup } />
                <Route name="login" path="/login" component={ Login } />
                <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
                <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword }/>
                <Route path="*" component={ NotFound } />
            </Route>
        </Router>,
        document.getElementById('react-root')
    );
});


