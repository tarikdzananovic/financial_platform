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

        let contractInvite = {
            _id: ctiData._id,
            biz: ctiData.biz,
            bizId: ctiData.bizId,
            template: ctiData.template,
            templateId: ctiData.templateId,
            legalIds: ctiData.legalIds,
            contractTerms: ctiData.contractTerms
        };

        let contractTalk = {
            ctiOwnerBizId: ctiData.bizId,
            ctNegotiatorBizId: myBiz._id,
            ctNegotiatorBiz: myBiz,
            contractInvite: contractInvite,
            contractInviteId: ctiData._id,
            legalIds: legalIds,
            currentContractTerms: ctiData.contractTerms,
            status: 'CONTRACT TALK CREATED'
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
}
