import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';
import { Meteor } from 'meteor/meteor';


import Signup from '../../ui/pages/auth/Signup.jsx';
import Login from '../../ui/pages/auth/Login.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';
import ForgotPassword from '../../ui/pages/auth/ForgotPassword';
import Home from '../../ui/pages/Home';
import Layout from '../../ui/pages/layout/Layout';
import Profile from '../../ui/pages/Profile';
import BizCreation from '../../ui/pages/biz/BizCreation'
import BizCabinet from '../../ui/pages/biz/BizCabinet'
import BizEdit from '../../ui/pages/biz/BizEdit'
import OtherBizes from '../../ui/pages/biz/OtherBizes.jsx';
import ContractInvite from '../../ui/pages/contract/ContractInvite.jsx';

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
        <Router history={ hashHistory }>
            <Route path="/" component={Layout} onEnter={authenticate}>
                <Redirect from="/" to="/home"/>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home}/>

                <Route path="profile" component={Profile}/>
                <Route path="biz/new" component={BizCreation}/>

                <Route path="biz">
                    <Route path="new" component={BizCreation}/>
                    <Route path="otherBizes" component={OtherBizes}/>
                    <Redirect from=":id" to=":id/cabinet"/>
                    <Route path=":id">
                        <Route path="edit" component={BizEdit}/>
                        <Route path="contractInvite" component={ContractInvite}/>
                        <Route path="cabinet" component={BizCabinet}/>
                    </Route>
                </Route>
            </Route>


            <Route path="/login" component={Login}/>
            <Route path="/forgot-password" component={ForgotPassword}/>
            <Route path="/register" component={Signup}/>

            <Route path="*" component={ NotFound } />
        </Router>,
        document.getElementById('react-root')
    );
});


