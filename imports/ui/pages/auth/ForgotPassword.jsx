import React from 'react';


export default class ForgotPassword extends React.Component {
    componentDidMount() {
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div id="extr-page" >
                <header id="header" className="animated fadeInDown">

                    <div id="logo-group">
                    </div>

                    <span id="extr-page-header-space"> <span className="hidden-mobile hiddex-xs">Need an account?</span> <a href="/register" className="btn btn-danger">Create account</a> </span>

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
                                    <form action="#/login" id="login-form" className="smart-form client-form">
                                        <header>
                                            Forgot Password
                                        </header>

                                        <fieldset>

                                            <section>
                                                <label className="label">Enter your email address</label>
                                                <label className="input"> <i className="icon-append fa fa-envelope"/>
                                                    <input type="email" name="email"/>
                                                    <b className="tooltip tooltip-top-right"><i className="fa fa-envelope txt-color-teal"/> Please enter email address for password reset</b></label>
                                            </section>
                                            <section>
										<span className="timeline-seperator text-center text-primary"> <span className="font-sm">OR</span>
                            </span></section>
                                            <section>
                                                <label className="label">Your Username</label>
                                                <label className="input"> <i className="icon-append fa fa-user"/>
                                                    <input type="text" name="username"/>
                                                    <b className="tooltip tooltip-top-right"><i className="fa fa-user txt-color-teal"/> Enter your username</b> </label>
                                                <div className="note">
                                                    <a href="#/login">I remembered my password!</a>
                                                </div>
                                            </section>

                                        </fieldset>
                                        <footer>
                                            <button type="submit" className="btn btn-primary">
                                                <i className="fa fa-refresh"/> Reset Password
                                            </button>
                                        </footer>
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
