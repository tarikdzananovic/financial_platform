import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ContractInvites = new Mongo.Collection('contractInvites');

if(Meteor.isServer) {
    Meteor.publish('contractInvites', function contractInvitesPublication() {
        return ContractInvites.find();
    });
}

Meteor.methods({
    'contractInvites.upsert'(contractInvite) {
        check(contractInvite.bizId, String);
        check(contractInvite.template, String);
        check(contractInvite.initiatorID, Number);
        check(contractInvite.contractTerms, {
            agentServiceType: String,
            startDate: Date,
            endDate: Date,
            compensationAmount: Number
        });

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        return ContractInvites.upsert({_id: contract._id}, { $set: contract});

    },
    'contractInvites.remove'(contractId) {
        check(contractId, String);

        ContractInvites.remove(contractId);
    },
    'contractInvites.get'() {
        return ContractInvites.find().fetch();
    },
});