/**
 * Created by tarikdzananovic on 7/24/17.
 */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';

Meteor.methods({
    sendMessage(message) {
        check(message, Object);

        Meteor.defer(() => {
            /*Email.send({
                to: 'tareeus@gmail.com',
                from: `${message.name} ${message.email}`,
                subject: `${message.name} sent a message!`,
                text: message.message,
            });*/
            Email.send({
                from: "tareeus@gmail.com",
                to: "tareeus@gmail.com",
                subject: "Meteor Can Send Emails via Gmail",
                text: "Its pretty easy to send emails via gmail."
            });
        });
    },
});