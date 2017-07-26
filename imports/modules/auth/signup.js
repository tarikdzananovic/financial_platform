/**
 * Created by tarikdzananovic on 6/9/17.
 */
import { hashHistory} from 'react-router';
import { Accounts} from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import '../validation.js';

let component;

const getUserData = () => ({
    email: document.querySelector('[name="email"]').value,
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

    Accounts.createUser(user, (error, response) => {
        if (error) {
            Bert.alert(error.reason, 'danger');
        } else {
            //Accounts.sendVerificationEmail(response);
            //hashHistory.push('/');
            Bert.alert('Verification mail has been sent to your email!', 'success');
        }
    });
};

const validate = () => {
    $(component.signupForm).validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 20
            },
            passwordConfirm: {
                required: true,
                minlength: 6,
                maxlength: 20,
                equalTo: '#password'
            },
            firstname: {
                required: true
            },
            lastname: {
                required: true
            },
            terms: {
                required: true
            }
        },

        // Messages for form validation
        messages: {
            login: {
                required: 'Please enter your login'
            },
            email: {
                required: 'Please enter your email address',
                email: 'Please enter a VALID email address'
            },
            password: {
                required: 'Please enter your password'
            },
            passwordConfirm: {
                required: 'Please enter your password one more time',
                equalTo: 'Please enter the same password as above'
            },
            firstname: {
                required: 'Please select your first name'
            },
            lastname: {
                required: 'Please select your last name'
            },
            terms: {
                required: 'You must agree with Terms and Conditions'
            }
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
        submitHandler() { signup(); },
    });
};

export default function handleSignup(options) {
    component = options.component;
    validate();
}

