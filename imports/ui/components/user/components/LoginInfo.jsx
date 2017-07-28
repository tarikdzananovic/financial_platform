import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import UserStore from '../stores/UserStore'
import ToggleShortcut from './ToggleShortcut.jsx'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

const userName = () => {
    const user = Meteor.user();
    const name = user && user.profile ? user.profile.name : '';
    //return user ? `${name.first} ${name.last}` : '';
    return user ? name : '';
};


class LoginInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: userName(),
            picture: "/apple-touch-icon-precomposed.png",
        };
    }

    componentWillMount() {
		UserStore.listen(function (data) {
            this.setState(data)
        }.bind(this))
    }

	render() {
		return (
			<div className="login-info">
			    <span>
			        <ToggleShortcut>
			            <img src={this.state.picture} alt="me"
							 className="online" /><span >{ this.props.currentUser }</span><i className="fa fa-angle-down" />
			        </ToggleShortcut>
			     </span>
			</div>
		);
	}
}

LoginInfo.propTypes = {
  currentUser: PropTypes.string,
};

export default createContainer(() => {

    return {
      currentUser: userName(),
    };
}, LoginInfo);

