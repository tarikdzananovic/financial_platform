/**
 * Created by tarikdzananovic on 7/14/17.
 */

import { Meteor} from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { hashHistory} from 'react-router';

export default class BizCabinetApi {

    static insertContractTalk(ctiData, myBizId, myBizLegalId) {

        let legalIds = ctiData.legalIds;

        for (var type in ctiData.legalIds) {
            if(!ctiData.legalIds[type].value) {
                legalIds[type].value = myBizLegalId;
            } else {
                legalIds[type].value = ctiData.legalIds[type].value;
            }
        }

        let contractTalk = {
            ctiOwnerBizId: ctiData.bizId,
            ctNegotiatorBizId: myBizId,
            contractInviteId: ctiData.contractInviteId,
            legalIds: legalIds,
            currentContractTerms: ctiData.contractTerms
        };

        const confirmation = 'Contract talk added';
        let bizId = myBizId;

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
