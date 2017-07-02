import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ContractTalks = new Mongo.Collection('contractTalks');

if(Meteor.isServer) {
    Meteor.publish('contractTalks', function contractTalksPublication() {
        return ContractTalks.find();
    });
}

Meteor.methods({
    'contractTalks.upsert'(contractTalk) {
        check(contractTalk.contractInviteId, String);
        check(contractTalk.initiatorAcceptedTerms, Boolean);
        check(contractTalk.receiverAcceptedTerms, Boolean);

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        return ContractTalks.update({ _id: contractTalk._id }, {
            $set: {
                contractInviteId: contractTalk.contractInviteId,
                initiatorAcceptedTerms: contractTalk.initiatorAcceptedTerms,
                receiverAcceptedTerms: contractTalk.receiverAcceptedTerms,
                contractTermsInitiator: contractTalk.contractTermsInitiator,
                contractTermsReceiver: contractTalk.contractTermsReceiver,
                contractTermsAccepted: contractTalk.contractTermsAccepted
            }
        }, { upsert: true });
    },
    'contractTalks.remove'(contractTalkId) {
        check(contractTalkId, String);

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        ContractTalks.remove(contractTalkId);
    },
    'contractTalks.get'() {
        return ContractTalks.find().fetch();
    },
});