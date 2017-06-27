/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertBiz } from '../api/bizes/methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
    const { biz } = component.props;
    const confirmation = biz && biz._id ? 'Biz updated!' : 'Biz added!';
    const upsert = {
        name: document.querySelector('[name="name"]').value.trim(),
        email: document.querySelector('[name="email"]').value.trim(),
        phone: document.querySelector('[name="phone"]').value.trim(),
        address: document.querySelector('[name="address"]').value.trim(),
    };

    if (biz && biz._id) upsert._id = biz._id;

    upsertBiz.call(upsert, (error, response) => {
        if (error) {
            Bert.alert(error.reason, 'danger');
        } else {
            //component.documentEditorForm.reset();
            Bert.alert(confirmation, 'success');
            //browserHistory.push(`/documents/${response.insertedId || biz._id}`);
        }
    });
};

const upsertRaw = (biz) => {
    const confirmation = biz && biz._id ? 'Biz updated!' : 'Biz added!';
    const upsert = {
        userId: biz.userId,
        name: biz.name,
        email: biz.email,
        phone: biz.phone,
        address: biz.address,
    };

    if (biz && biz._id) upsert._id = biz._id;

    console.log("Upsert object: " + JSON.stringify(upsert));

    upsertBiz.call(upsert, (error, response) => {
        if (error) {
            Bert.alert(error.reason, 'danger');
        } else {
            //component.documentEditorForm.reset();
            Bert.alert(confirmation, 'success');
            //browserHistory.push(`/documents/${response.insertedId || biz._id}`);
        }
    });

};

/*const validate = () => {
    $(component.documentEditorForm).validate({
        rules: {
            title: {
                required: true,
            },
            body: {
                required: true,
            },
        },
        messages: {
            title: {
                required: 'Need a title in here, Seuss.',
            },
            body: {
                required: 'This needs a body, please.',
            },
        },
        submitHandler() { handleUpsert(); },
    });
};*/

export default function bizEditor(options) {
    //component = options.component;
    //validate();

    upsertRaw(options);
}
