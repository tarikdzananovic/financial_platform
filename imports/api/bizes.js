/**
 * Created by tarikdzananovic on 6/28/17.
 */

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Bizes = new Mongo.Collection('bizes');

if (Meteor.isServer) {
    // This code only runs on the server
    console.log("Publications started!!!");

    let bizes = Bizes.find().fetch();
    console.log("Bizes count " + bizes.length);

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
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        return Bizes.upsert({ _id: biz._id }, { $set: biz });
    },
    'bizes.remove'(bizId) {
        check(bizId, String);

        Bizes.remove(bizId);
    },

    'bizes.get'() {
        return Bizes.find().fetch();
    },

    'bizes.getForUser'(userId) {
        return Bizes.find({userId: userId}).fetch();
    },

    'bizes.getBizInfoBasic'(bizId) {
        return Bizes.find({_id: bizId});
    },

});
