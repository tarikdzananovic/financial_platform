/**
 * Created by lejlatarik on 7/2/17.
 */

let templateIndex;

var getObjectType = (type, inputName) => {
    var object = {};
    object.type= type;
    object.inputName = inputName;
    object.value = undefined;
    return object;
}

var getAdvertisingTemplate = () =>
{
    var template = {};
    template.template = "Advertising Template";
    var actors = {};
    actors["Donor ID"] = "Donor";
    actors["Advertising Company ID"] = "Advertising Company";
    var legalIds = {};
    legalIds["Donor ID"] = undefined;
    legalIds["Advertising Company ID"] = undefined;
    var contractTerms = {};
    contractTerms["Agent Service Type"] = getObjectType("text", "agentServiceType");
    contractTerms["Start Date"] = getObjectType("date", "startDate");
    contractTerms["End Date"] = getObjectType("date", "endDate");
    contractTerms["Compensation Amount"] = getObjectType("number", "amount");
    template.actors = actors;
    template.legalIds = legalIds;
    template.contractTerms = contractTerms;
    return template;
}

var getTemplate = () => {
    switch (templateIndex){
        case "ADVERTISING_TEMPLATE":
            return getAdvertisingTemplate();
            break;
    }
};

export default function getContractInviteTemplate(value) {
    templateIndex = value;
    return getTemplate()
}