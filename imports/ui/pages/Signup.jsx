import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleSignup from '../../modules/signup';

const Recaptcha = require('react-recaptcha');

// specifying your onload callback function
let callback = function () {
    console.log('Done!!!!');
};

// specifying verify callback function
let verifyCallback = function (response) {
    console.log(response);
};

export default class Signup extends React.Component {
    componentDidMount() {
        handleSignup({ component: this });
    }

    handleSubmit(event) {
        event.preventDefault();
    }


    render() {
        return (
            <div className="Signup">
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <h4 className="page-header">Sign Up</h4>
                        <form
                            ref={ form => (this.signupForm = form) }
                            onSubmit={ this.handleSubmit }
                        >
                            <Row>
                                <Col xs={ 6 } sm={ 6 }>
                                    <FormGroup>
                                        <ControlLabel>First Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            ref="firstName"
                                            name="firstName"
                                            placeholder="First Name"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xs={ 6 } sm={ 6 }>
                                    <FormGroup>
                                        <ControlLabel>Last Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            ref="lastName"
                                            name="lastName"
                                            placeholder="Last Name"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={ 6 } sm={ 6 }>
                                    <FormGroup>
                                        <ControlLabel>Phone</ControlLabel>
                                        <FormControl
                                            type="text"
                                            ref="phone"
                                            name="phone"
                                            placeholder="Phone"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xs={ 6 } sm={ 6 }>
                                    <FormGroup>
                                        <ControlLabel>Address</ControlLabel>
                                        <FormControl
                                            type="text"
                                            ref="address"
                                            name="address"
                                            placeholder="Address"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                                <ControlLabel>Email Address</ControlLabel>
                                <FormControl
                                    type="text"
                                    ref="emailAddress"
                                    name="emailAddress"
                                    placeholder="Email Address"
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    type="password"
                                    ref="password"
                                    name="password"
                                    placeholder="Password"
                                />
                            </FormGroup>

                            <Recaptcha
                                sitekey="6LeLeCUUAAAAALbJxeNOM1-9WJL6QU4299_zseDY"
                                render="explicit"
                                onloadCallback={callback}
                                verifyCallback={verifyCallback}
                                theme="dark"
                            />

                            <Button type="submit" bsStyle="success">Sign Up</Button>
                        </form>
                        <p>Already have an account? <Link to="/login">Log In</Link>.</p>

                    </Col>
                </Row>
            </div>
        );
    }
}