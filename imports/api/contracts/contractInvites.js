import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ContractInvites = new Mongo.Collection('contractInvites');

if(Meteor.isServer) {
    Meteor.publish('contractInvites', function contractInvitesPublication() {
        return ContractInvites.find();
    });
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

Meteor.methods({
    'contractInvites.upsert'(contractInvite) {

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        let count = ContractInvites.find({bizId: contractInvite.biz._id}).count() + 1;

        return ContractInvites.update({ _id: contractInvite._id }, {
            $set: {
                bizId: contractInvite.biz._id,
                biz: contractInvite.biz,
                template: contractInvite.template,
                templateId: contractInvite.templateId,
                legalIds: contractInvite.legalIds,
                contractTerms: contractInvite.contractTerms,
                indexer: contractInvite.indexer + "-" + pad(count, 3),
                lastUpdate: moment().format('MMMM Do YYYY, h:mm:ss a')
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