/**
 * Created by griga on 11/24/15.
 */

import React from 'react'

import SmartMenu from '../../components/layout/navigation/components/SmartMenu'

import MinifyMenu from '../../components/layout/actions/MinifyMenu.jsx'

import LoginInfo from '../../components/user/components/LoginInfo.jsx'

let rawItems = [];

let Navigation = React.createClass({
    render: function () {
        return (
            <aside id="left-panel">
                <LoginInfo />
                <nav>
                    <SmartMenu rawItems={rawItems} />
                </nav>
                <MinifyMenu />
            </aside>
        )
    }
});


export default Navigation