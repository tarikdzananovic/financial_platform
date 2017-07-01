import React, { Component } from 'react';

import { createContainer } from 'meteor/react-meteor-data';

class ContractTemplate extends Component {
    render() {
        return (
            <div>

                <div className="row">
                    <section className="col col-6">
                        Info:
                    </section>
                </div>

                <div className="row">
                    <section  className="col col-6">
                        <label> Legal IDs used in Contract: </label>
                        <li>
                                    <span className="text">
                                        Donor ID
                                    </span>
                        </li>
                        <li>
                                    <span className="text">
                                        Advertising Company ID
                                    </span>
                        </li>
                    </section>
                </div>

                <div className="row">
                    <section  className="col col-6">
                        <label> Terms in Contract: </label>
                        <li>
                                    <span className="text">
                                        Agent Service Type
                                    </span>
                        </li>
                        <li>
                                    <span className="text">
                                        Start Date
                                    </span>
                        </li>
                        <li>
                                    <span className="text">
                                        End Date
                                    </span>
                        </li>
                        <li>
                                    <span className="text">
                                        Compensation Amount
                                    </span>
                        </li>
                    </section>
                </div>

            </div>
        );
    }
}

export default class ContractInvite extends Component {

    constructor(props) {
        super(props);

        this.state = {
            templateVisible: false
        };
    }

    onTemplateSelected() {
        this.setState({
            templateVisible: !this.state.templateVisible
        });
    }


    _onSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <form id="checkout-form" className="smart-form" noValidate="novalidate"
                  onSubmit={this._onSubmit}
                  ref={ form => (this.form = form) }
            >

                <header id="header" className="animated fadeInDown">
                    <div id="logo-group"></div>
                    <span id="extr-page-header-space">
                        Contract invite creation
                    </span>
                </header>

                <fieldset>
                    <div className="row">
                        <section className="col col-6">
                            <label className="select">
                                <select name="template" defaultValue={"0"} onChange={() => this.onTemplateSelected()}>
                                    <option value="0" disabled={true}>Contract Template</option>
                                    <option value="2">Advertising Template</option>
                                </select> <i/> </label>
                        </section>
                    </div>

                    {
                        this.state.templateVisible ? <ContractTemplate /> : null
                    }
                </fieldset>

                <footer>
                    <button type="submit" className="btn btn-primary">
                        Next
                    </button>
                </footer>

            </form>

        );
    }

}


