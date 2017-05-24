import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute, BrowserHistory } from 'react-router-dom'

//containers
import AppContainer from '../../ui/containers/AppContainer.jsx';
import MainContainer from '../../ui/containers/MainContainer.jsx';

//pages
import SignupPage from '../../ui/pages/SignupPage.jsx';
import LoginPage from '../../ui/pages/LoginPage.jsx';

export const renderRoutes = () => (
    <Router history={BrowserHistory}>
        <div>
            <Route path="login" component={LoginPage}/>
            <Route path="signup" component={SignupPage}/>
            <Route path="/" component={AppContainer}>
                <IndexRoute component={MainContainer} />
            </Route>
        </div>

    </Router>
)
