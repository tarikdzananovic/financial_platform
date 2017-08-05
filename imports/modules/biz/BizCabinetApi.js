/**
 * Created by tarikdzananovic on 7/14/17.
 */

import { Meteor} from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { hashHistory} from 'react-router';

export default class BizCabinetApi {

    static insertContractTalk(ctiData, myBiz) {

        let legalIds = ctiData.legalIds;

        for (var type in ctiData.legalIds) {
            if(!ctiData.legalIds[type].value) {
                legalIds[type].value = myBiz.legalId;
            } else {
                legalIds[type].value = ctiData.legalIds[type].value;
            }
        }

        Meteor.call('contractInvites.update', ctiData._id, true, function (error, response) {
            if (error) {
                console.log("Error: " + JSON.stringify(error));
                Bert.alert(error.reason, 'danger');
            } else {

            }
        });

        let contractInvite = {
            _id: ctiData._id,
            biz: ctiData.biz,
            bizId: ctiData.bizId,
            template: ctiData.template,
            templateId: ctiData.templateId,
            legalIds: ctiData.legalIds,
            contractTerms: ctiData.contractTerms,
            indexer: ctiData.indexer,
            active: true
        };

        let contractTalk = {
            ctiOwnerBizId: ctiData.bizId,
            ctNegotiatorBizId: myBiz._id,
            ctNegotiatorBiz: myBiz,
            contractInvite: contractInvite,
            contractInviteId: ctiData._id,
            legalIds: legalIds,
            currentContractTerms: ctiData.contractTerms,
            status: 'Contract talk started',
            indexer: contractInvite.indexer + "-T"
        };

        const confirmation = 'Contract talk added';
        let bizId = myBiz._id;

        Meteor.call('contractTalks.insert', contractTalk, function(error, response) {
            if (error) {
                console.log("Error: " + JSON.stringify(error));
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert(confirmation, 'success');
                hashHistory.push('/biz/' + bizId + '/contractTalk/' + response);
            }
        });
    }

    static removeCTI(contractInviteId, active){
        const confirmation = 'Contract invite removed';

        if (confirm('Are you sure you want to remove Contract Invite?')) {
            Meteor.call('contractInvites.remove', contractInviteId, active, function(error, response) {
                if (error) {
                    console.log("Error: " + JSON.stringify(error));
                    Bert.alert(error.reason, 'danger');
                } else {
                    Bert.alert(confirmation, 'success');
                }
            });
        } else {
            // Do nothing!
        }


    }
}
