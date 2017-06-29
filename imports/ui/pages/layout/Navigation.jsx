/**
 * Created by griga on 11/24/15.
 */

import React, { Component } from 'react'

import SmartMenu from '../../components/layout/navigation/components/SmartMenu'

import MinifyMenu from '../../components/layout/actions/MinifyMenu.jsx'

import LoginInfo from '../../components/user/components/LoginInfo.jsx'

export default class Navigation extends Component {

    constructor(props){
        super(props);
        this.state = {
            menuItems: []
        };
    }

    render() {
        return (
            <aside id="left-panel">
                <LoginInfo />
                <nav>
                    <SmartMenu rawItems={this.state.menuItems} />
                </nav>
                <MinifyMenu />
            </aside>
        );
    }
}
