import React, { Component } from 'react'
import UserStore from '../stores/UserStore'
import ToggleShortcut from './ToggleShortcut.jsx'
import { Meteor } from 'meteor/meteor';

const userName = () => {
    const user = Meteor.user();
    console.log("Entered setting userName " + JSON.stringify(user));
    const name = user && user.profile ? user.profile.name : '';
    return user ? `${name.first} ${name.last}` : '';
};


export default class LoginInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: userName(),
            picture: "/apple-touch-icon-precomposed.png",
        };
    }

    componentWillMount () {
		UserStore.listen(function (data) {
            this.setState(data)
        }.bind(this))
    }

	render(){
		return (
			<div className="login-info">
			    <span>
			        <ToggleShortcut>
			            <img src={this.state.picture} alt="me"
							 className="online" /><span>{ this.state.username }</span><i className="fa fa-angle-down" />
			        </ToggleShortcut>
			     </span>
			</div>
		);
	}
}

