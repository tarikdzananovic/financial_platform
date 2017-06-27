import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Bizes from './bizes';
import rateLimit from '../../modules/rate-limit.js';

export const upsertBiz = new ValidatedMethod({
    name: 'bizes.upsert',
    validate: new SimpleSchema({
        _id: { type: String, optional: true },
        userId: { type: String, optional: true },
        name: { type: String, optional: true },
        email: { type: String, optional: true },
        phone: { type: String, optional: true },
        address: { type: String, optional: true },
    }).validator(),
    run(biz) {
        console.log("Bizes: " + JSON.stringify(Bizes.findOne()));
        return Bizes.upsert({ _id: biz._id }, { $set: biz });
    },
});

export const removeBiz = new ValidatedMethod({
    name: 'bizes.remove',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        Bizes.remove(_id);
    },
});

rateLimit({
    methods: [
        upsertBiz,
        removeBiz,
    ],
    limit: 5,
    timeRange: 1000,
});
