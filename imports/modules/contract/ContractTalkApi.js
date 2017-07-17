import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { hashHistory} from 'react-router';

export default class ContractTalkApi {

    static saveMessageNewTerms(message, contractTalkId) {

        const confirmation = 'Message saved!';

        let saveMessageType = 'contractTalks.saveMessage';

        Meteor.call(saveMessageType, message, contractTalkId, function(error, response) {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert(confirmation, 'success');
                Session.set("currentContractTerms", response);
                return response;
            }
        });
    }

    static saveMessageAcceptTerms(message, contractTalkId, lastContractTerms) {
        const confirmation = 'Message saved!';
        let saveMessageType = 'contractTalks.saveMessageUpdateTerms';

        Meteor.call(saveMessageType, message, contractTalkId, lastContractTerms, function(error, response) {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert(confirmation, 'success');
                return response;
            }
        });
    }

    static saveMessageNewTermsReplaceLastAccepted(message, contractTalkId, lastContractTerms) {
        const confirmation = 'Message saved!';
        let saveMessageType = 'contractTalks.saveMessageUpdateTerms';

        Meteor.call(saveMessageType, message, contractTalkId, lastContractTerms, function(error, response) {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert(confirmation, 'success');
                return response;
            }
        });
    }

    static saveContract(contractTalk) {

        const confirmation = 'Contract saved!';

        let contract = {
            contractOwnerId: contractTalk.ctiOwnerBizId,
            contractNegotiatorId: contractTalk.ctNegotiatorBizId,
            negotiatorBiz: contractTalk.ctNegotiatorBiz,
            legalIds: contractTalk.legalIds,
            contractTerms: contractTalk.currentContractTerms,
            contractInvite: contractTalk.contractInvite
        };

        Meteor.call('contracts.insert', contract, function(error, response) {
            if(error){
                Bert.alert(error.reason,'danger');
            } else {
                Bert.alert(confirmation, 'success');
                hashHistory.push('/biz/' + contractTalk.ctiOwnerBizId + '/contract/' + response);
            }
        })

    }

}