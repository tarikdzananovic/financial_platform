import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleLogin from '../../../modules/login';
import UiValidate from '../../components/forms/validation/UiValidate';
export default class Login extends React.Component {
    componentDidMount() {
        handleLogin({ component: this });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {

        return (
            <div id="extr-page" >
                <header id="header" className="animated fadeInDown">

                    <div id="logo-group">
                        {/*<span id="logo"> <img src="styles/img/logo.png" alt="SmartAdmin"/> </span>*/}
                    </div>

                    <span id="extr-page-header-space"> <span className="hidden-mobile hiddex-xs">Need an account?</span>&nbsp;<a href="/register" className="btn btn-danger">Sign Up</a> </span>

                </header>
                <div id="main" role="main" className="animated fadeInDown">

                    <div id="content" className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-7 col-lg-8 hidden-xs hidden-sm">
                                <h1 className="txt-color-red login-header-big">Financial Platform</h1>

                                <div className="hero">
                                    <div className="pull-left login-desc-box-l">
                                        <h4 className="paragraph-header"></h4>
                                    </div>
                                </div>
                                {/*<div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                        <h5 className="about-heading">About Financial Platform</h5>

                                        <p>
                                            About the Platform
                                        </p>
                                    </div>
                                </div>*/}
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-4">
                                <div className="well no-padding">
                                    <UiValidate>
                                        <form action="#/dashboard" id="login-form" className="smart-form client-form">
                                            <header>
                                                Sign In
                                            </header>
                                            <fieldset>
                                                <section>
                                                    <label className="label">E-mail</label>
                                                    <label className="input"> <i className="icon-append fa fa-user"/>
                                                        <input type="email" name="email" data-smart-validate-input="" data-required="" data-email="" data-message-required="Please enter your email address" data-message-email="Please enter a VALID email address"/>
                                                        <b className="tooltip tooltip-top-right"><i className="fa fa-user txt-color-teal"/>
                                                            Please enter email address</b></label>
                                                </section>
                                                <section>
                                                    <label className="label">Password</label>
                                                    <label className="input"> <i className="icon-append fa fa-lock"/>
                                                        <input type="password" name="password" data-smart-validate-input="" data-required="" data-minlength="3" data-maxnlength="20" data-message="Please enter your email password"/>
                                                        <b className="tooltip tooltip-top-right"><i className="fa fa-lock txt-color-teal"/> Enter
                                                            your password</b> </label>

                                                    <div className="note">
                                                        <a href="/forgot-password">Forgot password?</a>
                                                    </div>
                                                </section>
                                            </fieldset>
                                            <footer>
                                                <button type="submit" className="btn btn-primary">
                                                    Sign in
                                                </button>
                                            </footer>
                                        </form></UiValidate>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        /*return (
            <div className="Login">
                <Row>
                    <Col xs={ 12 } sm={ 6 } md={ 4 }>
                        <h4 className="page-header">Login</h4>
                        <form
                            ref={ form => (this.loginForm = form) }
                            className="login"
                            onSubmit={ this.handleSubmit }
                        >
                            <FormGroup>
                                <ControlLabel>Email Address</ControlLabel>
                                <FormControl
                                    type="email"
                                    ref="emailAddress"
                                    name="emailAddress"
                                    placeholder="Email Address"
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>
                                    <span className="pull-left">Password</span>
                                    <Link className="pull-right" to="/recover-password">Forgot Password?</Link>
                                </ControlLabel>
                                <FormControl
                                    type="password"
                                    ref="password"
                                    name="password"
                                    placeholder="Password"
                                />
                            </FormGroup>
                            <Button type="submit" bsStyle="success">Login</Button>
                        </form>
                    </Col>
                </Row>
            </div>
        );*/
    }
}
