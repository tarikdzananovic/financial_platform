/**
 * Created by griga on 11/24/15.
 */

import React, { Component } from 'react'

import SmartMenu from '../../components/layout/navigation/components/SmartMenu'

import MinifyMenu from '../../components/layout/actions/MinifyMenu.jsx'

import LoginInfo from '../../components/user/components/LoginInfo.jsx'

let rawItems = [];

export default class Navigation extends Component {
    render() {
        return (
            <aside id="left-panel">
                <LoginInfo />
                <nav>
                    <SmartMenu rawItems={rawItems} />
                </nav>
                <MinifyMenu />
            </aside>
        );
    }
}
