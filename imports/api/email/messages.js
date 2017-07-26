/**
 * Created by tarikdzananovic on 7/24/17.
 */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';
import { Accounts} from 'meteor/accounts-base';

Meteor.methods({
    sendMessage(message) {
        check(message, Object);

        //Meteor.defer(() => {
            /*Email.send({
                to: 'tareeus@gmail.com',
                from: `${message.name} ${message.email}`,
                subject: `${message.name} sent a message!`,
                text: message.message,
            });*/
            Email.send({
                from: "postmaster@sandbox10cbc2ad755c4c01bdcd7b89ed2e25a3.mailgun.org",
                to: "tareeus@gmail.com",
                subject: "Account Verification",
                text: "Its pretty easy to send emails via gmail."
            });
        //});
    },

    sendVerificationMail(userId) {
        return Accounts.sendVerificationEmail(userId);
    }
});