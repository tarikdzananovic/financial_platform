/**
 * Created by tarikdzananovic on 7/28/17.
 */

import { Meteor } from 'meteor/meteor';

import { Accounts} from 'meteor/accounts-base';

Meteor.methods({
    createUserFromAdmin:function(user){
        let userId = Accounts.createUser(user);
        //sendVerificationMail
        if(Meteor.settings.public.emailVerification) {
            Accounts.sendVerificationEmail(userId);
        }
    },

});