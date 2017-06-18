import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';
import { Meteor } from 'meteor/meteor';

import App from '../../ui/layouts/App.jsx';
import Index from '../../ui/layouts/Index.jsx';
import Signup from '../../ui/pages/auth/Signup.jsx';
import Login from '../../ui/pages/auth/Login.jsx';
import RecoverPassword from '../../ui/pages/RecoverPassword.jsx';
import ResetPassword from '../../ui/pages/ResetPassword.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';
import ForgotPassword from '../../ui/pages/auth/ForgotPassword';
import Home from '../../ui/pages/Home';
import Layout from '../../ui/pages/layout/Layout';

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
            <Route path="/" component={Layout} onEnter={authenticate}>
                <Redirect from="/" to="/home"/>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home}/>
            </Route>
            <Route path="login" component={Login}/>
            <Route path="forgot-password" component={ForgotPassword}/>
            <Route path="register" component={Signup}/>

            {/*<Route path="/" component={ App }>
                <IndexRoute name="index" component={ Index } />
                <Route name="signup" path="/signup" component={ Signup } />
                <Route name="login" path="/login" component={ Login } />
                <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
                <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword }/>
                <Route path="forgot-password" component={ForgotPassword}/>
                <Route path="*" component={ NotFound } />
            </Route>*/}
        </Router>,
        document.getElementById('react-root')
    );
});


