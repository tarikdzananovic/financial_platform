import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from '../../ui/layouts/App.jsx';


export const renderRoutes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={App}/>
        </Switch>
    </BrowserRouter>
);
