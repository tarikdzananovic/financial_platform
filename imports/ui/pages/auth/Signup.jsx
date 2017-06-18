import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import LoadHtml from '../../components/utils/LoadHtml'
import handleSignup from '../../../modules/signup';
import MaskedInput from '../../components/forms/inputs/MaskedInput';
import UiValidate from '../../components/forms/validation/UiValidate';

const Recaptcha = require('react-recaptcha');

export default class Signup extends React.Component {

    componentDidMount() {
        handleSignup({component: this});
    }

    _onSubmit(event){
        event.preventDefault();
    }

    render() {
        return (
            <div id="extr-page" >
                <header id="header" className="animated fadeInDown">

                    <div id="logo-group">
                    </div>

                    <span id="extr-page-header-space">
                        <span className="hidden-mobile hiddex-xs">Already registered?</span>&nbsp;
                        <a href="/login" className="btn btn-danger">Sign In</a> </span>
                </header>


                <div id="main" role="main" className="animated fadeInDown">

                    {/* MAIN CONTENT */}
                    <div id="content" className="container">

                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7 hidden-xs hidden-sm">
                                <h1 className="txt-color-red login-header-big">Financial Platform</h1>

                                <div className="hero">
                                    <div className="pull-left login-desc-box-l">
                                        <h4 className="paragraph-header"></h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                                <div className="well no-padding">
                                        <form id="smart-form-register" className="smart-form client-form" noValidate="novalidate"
                                              ref={ form => (this.signupForm = form) }
                                              onSubmit={this._onSubmit}>
                                            <header>
                                                Registration is FREE*
                                            </header>

                                            <fieldset>
                                                <section>
                                                    <label className="input"> <i className="icon-append fa fa-envelope"/>
                                                        <input type="email" name="email" placeholder="Email address"/>
                                                        <b className="tooltip tooltip-bottom-right">Needed to verify your account</b> </label>
                                                </section>

                                                <section>
                                                    <label className="input"> <i className="icon-append fa fa-lock"/>
                                                        <input type="password" name="password" placeholder="Password" id="password"/>
                                                        <b className="tooltip tooltip-bottom-right">Don't forget your password</b> </label>
                                                </section>

                                                <section>
                                                    <label className="input"> <i className="icon-append fa fa-lock"/>
                                                        <input type="password" name="passwordConfirm" placeholder="Confirm password"/>
                                                        <b className="tooltip tooltip-bottom-right">Don't forget your password</b> </label>
                                                </section>
                                            </fieldset>

                                            <fieldset>
                                                <div className="row">
                                                    <section className="col col-6">
                                                        <label className="input">
                                                            <input type="text" name="firstName" placeholder="First name"/>
                                                        </label>
                                                    </section>
                                                    <section className="col col-6">
                                                        <label className="input">
                                                            <input type="text" name="lastName" placeholder="Last name"/>
                                                        </label>
                                                    </section>
                                                </div>

                                                <div className="row">
                                                    <section className="col col-6">
                                                        <label className="input"> <i className="icon-append fa fa-phone"/>
                                                            <MaskedInput type="tel" name="phone" placeholder="Phone" mask="(999) 999-9999" />
                                                        </label>
                                                    </section>
                                                    <section className="col col-6">
                                                        <label className="input">
                                                            <input type="text" name="address" placeholder="Address"/>
                                                        </label>
                                                    </section>
                                                </div>

                                                <div className="row">
                                                    <section className="col col-6">
                                                        <label className="select">
                                                            <select name="gender" defaultValue={"0"}>
                                                                <option value="0" disabled={true}>Gender</option>
                                                                <option value="1">Male</option>
                                                                <option value="2">Female</option>
                                                            </select> <i/> </label>
                                                    </section>
                                                </div>

                                                <section>
                                                    <label className="checkbox">
                                                        <input type="checkbox" name="subscription" id="subscription"/>
                                                        <i/>I want to receive news and special offers</label>
                                                    <label className="checkbox">
                                                        <input type="checkbox" name="terms" id="terms"/>
                                                        <i/>I agree with the <a data-toggle="modal" data-target="#myModal"> Terms and Conditions </a></label>
                                                </section>
                                            </fieldset>
                                            <footer>
                                                <button type="submit" className="btn btn-primary" >
                                                    Register
                                                </button>
                                            </footer>

                                            <div className="message">
                                                <i className="fa fa-check"/>
                                                <p>
                                                    Thank you for your registration!
                                                </p>
                                            </div>
                                        </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}