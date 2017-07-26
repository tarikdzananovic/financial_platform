/**
 * Created by lejlatarik on 7/2/17.
 */

import getTemplateText from './TemplateText'

let templateIndex;

var getObjectType = (type, inputName, parameter) => {
    var object = {};
    object.type= type;
    object.inputName = inputName;
    object.value = undefined;
    object.parameter = parameter;
    return object;
}

var getAdvertisingTemplate = () =>
{
    var template = {};
    template.template = "Advertising Template";
    var actors = {};
    actors["Company Legal ID"] = "Company";
    actors["Agent Legal ID"] = "Agent";
    var legalIds = {};
    legalIds["Company Legal ID"] = getObjectType("text", "companyLegalId", "{CompanyLegalID}");
    legalIds["Agent Legal ID"] = getObjectType("text", "agentLegalId", "{AgentLegalID}");
    var contractTerms = {};
    contractTerms["Agent Service Type"] = getObjectType("text", "agentServiceType", "{AgentServiceType}");
    contractTerms["Start Date"] = getObjectType("date", "startDate", "{StartDate}");
    contractTerms["End Date"] = getObjectType("date", "endDate", "{EndDate}");
    contractTerms["Compensation Amount"] = getObjectType("number", "amount", "{CompensationAmount}");
    template.actors = actors;
    template.legalIds = legalIds;
    template.contractTerms = contractTerms;
    template.indexer = "C-01";

    var objectTemplate = {};
    objectTemplate.template = template;
    objectTemplate.text = getTemplateText(templateIndex);
    return objectTemplate;
}

var getTemplate = () => {
    switch (templateIndex){
        case "ADVERTISING_TEMPLATE":
            return getAdvertisingTemplate();
            break;
    }
};

export default function getContractInviteTemplate(templateId) {
    templateIndex = templateId;
    return getTemplate()
}