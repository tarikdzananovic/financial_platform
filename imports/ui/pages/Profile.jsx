import React, { Component, PropTypes } from 'react';
import { Meteor} from 'meteor/meteor';
import { hashHistory} from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: props.currentUser,
        };

        console.log("Logged in user: " +JSON.stringify(this.state.user));

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    _onSubmit(e) {
        e.preventDefault();
        console.log("Submit profile BLABLABLA");
        Meteor.users.update(Meteor.userId(), {$set: {profile: this.state.user.profile}});
        hashHistory.push('/');

    }

    handleFirstNameChange(e) {
        let user = this.state.user;
        user.profile.name.first= e.target.value;
        this.setState({ user: user});
    }

    handleLastNameChange(e) {
        let user = this.state.user;
        user.profile.name.last= e.target.value;
        this.setState({ user: user});
    }

    handleEmailChange(e) {
        let user = this.state.user;
        user.emails[0].address= e.target.value;
        this.setState({ user: user});
    }

    handlePhoneChange(e) {
        let user = this.state.user;
        user.profile.phone= e.target.value;
        this.setState({ user: user});
    }

    handleAddressChange(e) {
        let user = this.state.user;
        user.profile.address= e.target.value;
        this.setState({ user: user});
    }

    render() {
        return (
            <form id="checkout-form" className="smart-form" noValidate="novalidate" onSubmit={this._onSubmit}>

                <header id="header" className="animated fadeInDown">
                    <div id="logo-group"></div>
                    <span id="extr-page-header-space">
                        Profile information
                    </span>
                </header>

                <fieldset>
                    <div className="row">
                        <section className="col col-6">
                            <label className="input"> <i className="icon-prepend fa fa-user"/>
                                <input type="text" name="fname" placeholder="First name" value={ this.state.user.profile.name.first } onChange={this.handleFirstNameChange}/>
                            </label>
                        </section>
                        <section className="col col-6">
                            <label className="input"> <i className="icon-prepend fa fa-user"/>
                                <input type="text" name="lname" placeholder="Last name" value={ this.state.user.profile.name.last } onChange={this.handleLastNameChange} />
                            </label>
                        </section>
                    </div>

                    <div className="row">
                        <section className="col col-6">
                            <label className="input"> <i className="icon-prepend fa fa-envelope-o"/>
                                <input type="email" name="email" placeholder="E-mail" value={ this.state.user.emails[0].address } onChange={ this.handleEmailChange}/>
                            </label>
                        </section>
                        <section className="col col-6">
                            <label className="input"> <i className="icon-prepend fa fa-phone"/>
                                <input type="tel" name="phone" placeholder="Phone" data-smart-masked-input="(999) 999-9999" value={ this.state.user.profile.phone } onChange={this.handlePhoneChange}/>
                            </label>
                        </section>
                    </div>
                </fieldset>

                <fieldset>

                    <section>
                        <label htmlFor="address2" className="input">
                            <input type="text" name="address2" id="address2" placeholder="Address" value={this.state.user.profile.address} onChange={this.handleAddressChange}/>
                        </label>
                    </section>

                    <section>
                        <label className="textarea">
                            <textarea rows="3" name="info" placeholder="Additional info"/>
                        </label>
                    </section>
                </fieldset>

                <footer>
                    <button type="submit" className="btn btn-primary">
                        Save changes
                    </button>
                </footer>

            </form>

        );
    }
}

Profile.propTypes = {
    currentUser: PropTypes.object,
};

export default createContainer(() => {

    return {
        currentUser: Meteor.user(),
    };
}, Profile);