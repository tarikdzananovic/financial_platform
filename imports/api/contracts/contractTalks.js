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

    'contractTalks.insert'(contractTalk) {

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        return ContractTalks.insert(contractTalk);

    },

    'contractTalks.upsert'(contractTalk) {

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        return ContractTalks.update({ _id: contractTalk._id }, {
            $set: {
                contractInviteId: contractTalk.contractInviteId,
                legalIds: contractTalk.legalIds,
                currentContractTerms: contractTalk.currentContractTerms,
                messages: contractTalk.messages,
                contractAcceptance: contractTalk.contractAcceptance,
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