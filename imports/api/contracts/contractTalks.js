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

        contractTalk.lastUpdate = moment().format('MMMM Do YYYY, h:mm:ss a');

        return ContractTalks.insert(contractTalk);

    },

    'contractTalks.saveMessage'(message, contractTalkId, status) {

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        ContractTalks.update({_id: contractTalkId}, {
            $push: { messages: message },
            $set: {status: status, lastUpdate: moment().format('MMMM Do YYYY, h:mm:ss a')}
        });

        return ContractTalks.findOne({_id: contractTalkId}, {fields: {currentContractTerms: 1}});

    },

    'contractTalks.saveMessageUpdateTerms'(message, contractTalkId, lastContractTerms, status) {

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        ContractTalks.update({_id: contractTalkId},
            {
                $push: {messages: message},
                $set: {currentContractTerms: lastContractTerms, status: status, lastUpdate: moment().format('MMMM Do YYYY, h:mm:ss a')}
            });

        return ContractTalks.findOne({_id: contractTalkId}, {fields: {currentContractTerms: 1}});

    },

    'contractTalks.updateStatus'(contractTalkId, status) {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        ContractTalks.update({_id: contractTalkId},
            {
                $set: { status: status, lastUpdate: moment().format('MMMM Do YYYY, h:mm:ss a')}
            });

        return ContractTalks.findOne({_id: contractTalkId}, {fields: {currentContractTerms: 1}});
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