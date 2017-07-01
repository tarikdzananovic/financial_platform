/**
 * Created by lejlatarik on 7/1/17.
 */
import { Meteor} from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import '../validation.js';


let component;

const getBizData = () => ({
    userId: Meteor.user()._id,
    name: document.querySelector('[name="name"]').value,
    email: document.querySelector('[name="email"]').value,
    phone: document.querySelector('[name="phone"]').value,
    address: document.querySelector('[name="address"]').value
});

const saveBiz = () => {
    //TODO:: call api end point to save BIZ
};

const validate = () => {
    console.log('validate-method');
    jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 &&
            phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
    }, "Please specify a valid phone number");


    $(component.form).validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            name: {
                required: true
            },
            address: {
                required: true
            },
            phone: {
                required: true,
                phoneUS: true
            }
        },

        // Messages for form validation
        messages: {
            email: {
                required: 'Please enter BIZ email address',
                email: 'Please enter a VALID email address'
            },
            name: {
                required: 'Please enter BIZ name'
            },
            address: {
                required: 'Please enter BIZ address'
            },
            phone: {
                required: 'Please enter BIZ phone',
                phoneUS: 'Please enter a valid US phone number'
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
        submitHandler() { saveBiz(); },
    });
};

export default function handleBizEdit(options) {
    component = options.component;
    validate();
}

