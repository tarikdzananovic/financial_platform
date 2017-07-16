import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';


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
                Session.set("currentContractTerms", response);
                return response;
            }
        });
    }

}