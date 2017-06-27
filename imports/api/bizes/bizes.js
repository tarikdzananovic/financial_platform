/**
 * Created by tarikdzananovic on 6/8/17.
 */
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Bizes = new Mongo.Collection('Bizes');
export default Bizes;

Bizes.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Bizes.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

Bizes.schema = new SimpleSchema({
    name: {
        type: String,
        label: 'The name of the biz.',
    },
    email: {
        type: String,
        label: 'The email of the biz.',
    },
    phone: {
        type: String,
        label: 'The phone of the biz.',
    },
    address: {
        type: String,
        label: 'The address of the biz.',
    },
});

Bizes.attachSchema(Bizes.schema);

Factory.define('biz', Bizes, {
    name: () => 'Factory Name',
    email: () => 'Factory Email',
    phone: () => 'Factory Phone',
    address: () => 'Factory Address',
});
