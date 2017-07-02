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
        /*check(contractInvite.legalIDs, String);
        check(contractInvite.contractTerms, {
            agentServiceType: String,
            startDate: Date,
            endDate: Date,
            compensationAmount: Number
        });*/

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        return ContractInvites.update({ _id: contractInvite._id }, {
            $set: {
                bizId: contractInvite.bizId,
                template: contractInvite.template,
                legalIds: contractInvite.legalIds,
                contractTerms: contractInvite.contractTerms
            }
        }, { upsert: true });
    },
    'contractInvites.remove'(contractInviteId) {
        check(contractInviteId, String);

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        ContractInvites.remove(contractInviteId);
    },
    'contractInvites.get'() {
        return ContractInvites.find().fetch();
    },
});