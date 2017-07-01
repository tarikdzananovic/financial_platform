/**
 * Created by tarikdzananovic on 6/29/17.
 */

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Contracts = new Mongo.Collection('contracts');

if(Meteor.isServer) {
    Meteor.publish('contracts', function contractsPublication() {
        return Contracts.find();
    });
}

Meteor.methods({
    'contracts.upsert'(contract) {
        check(contract.bizId, String);
        check(contract.role, String);
        check(contract.startDate, String);
        check(contract.endDate, String);
        check(contract.amount, String);
        check(contract.status, String);

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        return Contracts.upsert({_id: contract._id}, { $set: contract});

    },
    'contracts.remove'(contractId) {
        check(contractId, String);

        Contracts.remove(contractId);
    },
    'contracts.get'() {
        return Contracts.find().fetch();
    },
});