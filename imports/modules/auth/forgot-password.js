import { browserHistory} from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import '../validation.js';

let component;

const handleRecovery = () => {
    Accounts.forgotPassword({
        email: document.querySelector('[name="emailAddress"]').value,
    }, (error) => {
        if (error) {
            Bert.alert(error.reason, 'warning');
        } else {
            browserHistory.push('/login');
            Bert.alert('Check your inbox for a reset link!', 'success');
        }
    });
};

const validate = () => {
    $(component.forgetPasswordForm).validate({
        rules: {
            emailAddress: {
                required: true,
                email: true,
            },
        },
        messages: {
            emailAddress: {
                required: 'Need an email address here.',
                email: 'Is this email address legit?',
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
        submitHandler() { handleRecovery(); },
    });
};

export default function handleRecoverPassword(options) {
    component = options.component;
    validate();
}