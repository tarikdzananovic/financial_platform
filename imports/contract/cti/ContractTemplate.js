/**
 * Created by lejlatarik on 7/2/17.
 */

let templateIndex;


var getTemplateInfo = () => {
    var object = [];
    object.push("Agreement");
    object.push("=========");
    object.push("");
    object.push("This is an agreement between {CompanyLegalID} and {AgentLegalID} named in the text below as Company and Agent.");
    object.push("");
    object.push("    Company is hiring Agent to run advertising campaing of Company's businesses.");
    object.push("Exact advertising service type is {AgentServiceType}.");
    object.push("");
    object.push("Agent will run advertising campaing between start and end dates.");
    object.push("    Start date: {StartDate}");
    object.push("End date: (EndDate)");
    object.push("");
    object.push("Agent compensation will be ${CompensationAmount} paid by Company to Agent at Start date.");
    object.push("");
    object.push("    Terms are accepted by Company: {CompanyLegalSignature}");
    object.push("Terms are accepted by Agent: {AgentLegalSignature}");
    object.push("Date: {ContractAcceptanceDate}");
    return object;
}

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
    actors["Company Legal ID"] = "Company";
    actors["Agent Legal ID"] = "Agent";
    var legalIds = {};
    legalIds["Company Legal ID"] = undefined;
    legalIds["Agent Legal ID"] = undefined;
    var contractTerms = {};
    contractTerms["Agent Service Type"] = getObjectType("text", "agentServiceType");
    contractTerms["Start Date"] = getObjectType("date", "startDate");
    contractTerms["End Date"] = getObjectType("date", "endDate");
    contractTerms["Compensation Amount"] = getObjectType("number", "amount");
    template.actors = actors;
    template.legalIds = legalIds;
    template.contractTerms = contractTerms;

    var objectTemplate = {};
    objectTemplate.template = template;
    objectTemplate.text = getTemplateInfo();
    return objectTemplate;
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