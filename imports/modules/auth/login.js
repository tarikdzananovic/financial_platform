/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import '../validation.js';

let component;

const login = () => {
    const email = document.querySelector('[name="emailAddress"]').value;
    const password = document.querySelector('[name="password"]').value;

    Meteor.loginWithPassword(email, password, (error) => {
        if (error) {
            Bert.alert(error.reason, 'warning');
        } else {
            Bert.alert('Logged in!', 'success');

            const { location } = component.props;
            if (location.state && location.state.nextPathname) {
                browserHistory.push(location.state.nextPathname);
            } else {
                browserHistory.push('/');
            }
        }
    });
};

const validate = () => {
    $(component.loginForm).validate({
        rules: {
            emailAddress: {
                required: true,
                email: true,
            },
            password: {
                required: true,
            },
        },
        messages: {
            emailAddress: {
                required: 'Need an email address here.',
                email: 'Is this email address legit?',
            },
            password: {
                required: 'Need a password here.',
            },
        },
        errorElement: 'em',
        errorClass: 'invalid',
        highlight: function(element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            $(element).parent().addClass('state-error').removeClass('state-success');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
            $(element).parent().removeClass('state-error').addClass('state-success');
        },
        errorPlacement : function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler() { login(); },
    });
};

export default function handleLogin(options) {
    component = options.component;
    validate();
}
