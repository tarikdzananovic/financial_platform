import React, { Component } from 'react'

import Header from './Header.jsx'
import Navigation from './Navigation.jsx'
import Ribbon from './Ribbon.jsx'
import Footer from './Footer.jsx'
import Shortcut from './Shortcut.jsx'

import UserActions from '../../components/user/actions/UserActions'

//require('../../components/layout/less/layout.less');

export default class Layout extends Component{
    componentWillMount() {
        UserActions.init();
    }

    render(){
        return (
            <div>
                <Header />
                <Navigation />

                <div id="main" role="main">
                    <Ribbon />
                    {this.props.children}
                </div>

                <Shortcut />
            </div>
        );
    }
}
