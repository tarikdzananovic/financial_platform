/**
 * Created by griga on 11/30/15.
 */

import React from 'react'
import Reflux from 'reflux'

import SmartMenuList from './SmartMenuList.jsx'

import NavigationStore from './../stores/NavigationStore.js'
import NavigationActions from './../actions/NavigationActions'

let SmartMenu = React.createClass({
    mixins:[Reflux.connect(NavigationStore)],

    getInitialState: function () {
        return {
            loading: !NavigationStore.loaded,
            items: []
        }
    },

    componentWillMount() {
        if (!NavigationStore.loaded) NavigationActions.getItems();
    },

    componentDidMount(){
        this.listenTo(NavigationStore, this.handleNavigationItems);
    },
    componentWillUnmount(){
        this._unsubscribe();
    },

    handleNavigationItems(data) {
        if(data.items){
            this.setState({
                loading: false,
                items: data.items
            });
        }
    },
    render: function () {
        return (
            <SmartMenuList items={this.state.items} />
        )
    }
});

export default SmartMenu
