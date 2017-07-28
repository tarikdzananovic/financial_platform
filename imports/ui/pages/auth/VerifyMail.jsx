import React, { Component } from 'react';
import { hashHistory} from 'react-router';
import { Accounts } from 'meteor/accounts-base'

export default class VerifyMail extends Component {

    constructor(props) {
        super(props);

        this.onClickHandled = this.onClickHandled.bind(this);
    }


    onClickHandled() {
        hashHistory.push('/');
    }

    render() {
        return (
            <div>
                <span>Verify Mail</span>
                <button className="btn btn-block btn-primary" onClick={this.onClickHandled}>Start App</button>
            </div>
        );
    }
}