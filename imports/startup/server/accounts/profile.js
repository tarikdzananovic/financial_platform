/**
 * Created by tarikdzananovic on 6/24/17.
 */

import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    userUpdate: function(id, doc) {
        Meteor.users.update(id, {
           $set: {
                profile: doc.profile
           }
        });

        return true;
    }
});