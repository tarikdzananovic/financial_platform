/**
 * Created by tarikdzananovic on 6/28/17.
 */

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Bizes = new Mongo.Collection('bizes');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('bizes', function bizesPublication() {
        return Bizes.find();
    });
}

Meteor.methods({
    'bizes.upsert'(biz) {
        check(biz.userId, String);
        check(biz.name, String);
        check(biz.email, String);
        check(biz.phone, String);
        check(biz.address, String);
        check(biz.legalId, String);

        // Make sure the user is logged in before inserting a task
        if (biz.userId != Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        return Bizes.update({ _id: biz._id }, {
            $set: {
                userId:biz.userId,
                name: biz.name,
                email: biz.email,
                phone: biz.phone,
                address: biz.address,
                legalId: biz.legalId
            }
        }, { upsert: true });
    },
    'bizes.remove'(bizId) {
        check(bizId, String);

        // Make sure the user is logged in before inserting a task
        if (biz.userId != Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Bizes.remove(bizId);
    },

    'bizes.get'() {
        return Bizes.find({}, {fields: {_id: 1, name: 1}}).fetch();
    },

    'bizes.getForUser'(userId) {
        return Bizes.find({userId: userId}, {fields: {_id: 1, name: 1}}).fetch();
    },

    'bizes.getInfoBasic'(bizId) {
        return Bizes.findOne({_id: bizId}, {fields: { name: 1, userId: 1 }});
    },

    'bizes.getInfoForEdit'(bizId) {
        return Bizes.findOne({_id : bizId}, { fields: { name: 1, email: 1, address:1, phone: 1, legalId: 1} });
    },

    'bizes.getForOtherUsers'() {
        return Bizes.find({userId: {$ne: Meteor.userId()}}, { fields: { name: 1, email: 1} }).fetch();
    }

});
