/**
 * Created by tarikdzananovic on 6/9/17.
 */
import { browserHistory} from 'react-router';
import { Accounts} from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

let component;

const getUserData = () => ({
    email: document.querySelector('[name="emailAddress"]').value,
    password: document.querySelector('[name="password"]').value,
    profile: {
        name: {
            first: document.querySelector('[name="firstName"]').value,
            last: document.querySelector('[name="lastName"]').value,
        },
        phone: document.querySelector('[name="phone"]').value,
        address: document.querySelector('[name="address"]').value,
    },
});

const signup = () => {
    const user = getUserData();

    console.log("User: " + JSON.stringify(user));

    Accounts.createUser(user, (error) => {
        if (error) {
            Bert.alert(error.reason, 'danger');
        } else {
            browserHistory.push('/');
            Bert.alert('Welcome!', 'success');
        }
    });
};

const validate = () => {
    $(component.signupForm).validate({
        rules: {
            firstName: {
                required: true,
            },
            lastName: {
                required: true,
            },
            emailAddress: {
                required: true,
                email: true,
            },
            password: {
                required: true,
            },
        },
        messages: {
            firstName: {
                required: 'First name?',
            },
            lastName: {
                required: 'Last name?',
            },
            emailAddress: {
                required: 'Need an email address here.',
                email: 'IS this email address legit?',
            },
            password: {
                required: 'Need a password here.',
            },
        },
        submitHandler() { signup(); },
    });
};

export default function handleSignup(options) {
    component = options.component;
    validate();
}

