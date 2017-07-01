import React, { Component } from 'react';

import handleBizEdit from '../../../modules/biz/BizEdit';


export default class BizEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            biz: {},
            bizCabinetLocation: window.location.hash.replace('edit', 'cabinet')

        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() {
        handleBizEdit({component: this});
    }

    _onSubmit(e) {
        e.preventDefault();
    }

    handleNameChange(e) {
        if(e){

            let bizObj = this.state.biz;
            bizObj.name= e.target.value;
            this.setState({ biz: bizObj});
        }
    }
    handleEmailChange(e) {
        if(e){
            let bizObj = this.state.biz;
            bizObj.email= e.target.value;
            this.setState({ biz: bizObj});
        }
    }
    handlePhoneChange(e) {
        if(e){
            let bizObj = this.state.biz;
            bizObj.phone= e.target.value;
            this.setState({ biz: bizObj});
        }
    }
    handleAddressChange(e) {
        if(e){
            let bizObj = this.state.biz;
            bizObj.address= e.target.value;
            this.setState({ biz: bizObj});
        }
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
                        BIZ Edit Information
                    </span>
                </header>

                <fieldset>
                    <div className="row">
                        <section className="col col-6">
                            <label className="input"> <i className="icon-prepend fa fa-user"/>
                                <input type="text" name="name" placeholder="BIZ Name" value={ this.state.biz.name } onChange={this.handleNameChange()}/>
                            </label>
                        </section>
                        <section className="col col-6">
                            <label className="input"> <i className="icon-prepend fa fa-user"/>
                                <input type="email" name="email" placeholder="Email" value={ this.state.biz.email } onChange={this.handleEmailChange()} />
                            </label>
                        </section>
                    </div>

                    <div className="row">
                        <section className="col col-6">
                            <label className="input"> <i className="icon-prepend fa fa-phone"/>
                                <input type="tel" name="phone" placeholder="Phone" data-smart-masked-input="(999) 999-9999" value={ this.state.biz.phone } onChange={this.handlePhoneChange}/>
                            </label>
                        </section>
                        <section className="col col-6">
                            <label className="input"> <i className="icon-prepend fa fa-envelope-o"/>
                                <input type="text" name="address" placeholder="Address" value={ this.state.biz.address } onChange={ this.handleAddressChange()}/>
                            </label>
                        </section>
                    </div>
                </fieldset>

                <footer>
                    <button type="submit" className="btn btn-primary">
                        Save changes
                    </button>
                    <a href={this.state.bizCabinetLocation} className="btn btn-default">
                        Back to cabinet
                    </a>
                </footer>

            </form>

        );
    }
}