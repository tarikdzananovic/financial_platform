/**
 * Created by tarikdzananovic on 7/9/17.
 */

let templateIndex;
let legalIdsValues;
let contractTermsValues;


var getTemplateInfo = () => {
    if(legalIdsValues){
        var companyLegalId = legalIdsValues["Company Legal ID"] ? legalIdsValues["Company Legal ID"].value : undefined;
        var agentLegalId = legalIdsValues["Agent Legal ID"] ? legalIdsValues["Agent Legal ID"].value : undefined;
    }

    let companyLegalIdParam = companyLegalId ? companyLegalId : "{CompanyLegalID}";
    let agentLegalIdParam = agentLegalId ? agentLegalId : "{AgentLegalID}";

    if(contractTermsValues) {
        var agentServiceType = contractTermsValues["Agent Service Type"] ? contractTermsValues["Agent Service Type"].value : undefined;
        var startDate = contractTermsValues["Start Date"] ? contractTermsValues["Start Date"].value : undefined;
        var endDate = contractTermsValues["End Date"] ? contractTermsValues["End Date"].value : undefined;
        var compensationAmount = contractTermsValues["Compensation Amount"] ? contractTermsValues["Compensation Amount"].value : undefined;
    }

    let agentServiceTypeParam = agentServiceType ? agentServiceType : "{AgentServiceType}";
    let startDateParam = startDate ? startDate : "{StartDate}";
    let endDateParam = endDate ? endDate : "{EndDate}";
    let compensationAmountParam = compensationAmount ? compensationAmount : "{CompensationAmount}";

    var object = [];
    object.push("Agreement");
    object.push("=========");
    object.push("");
    object.push("This is an agreement between " + companyLegalIdParam + " and " + agentLegalIdParam + " named in the text below as Company and Agent.");
    object.push("");
    object.push("    Company is hiring Agent to run advertising campaing of Company's businesses.");
    object.push("Exact advertising service type is " + agentServiceTypeParam + ".");
    object.push("");
    object.push("Agent will run advertising campaing between start and end dates.");
    object.push("    Start date: " + startDateParam);
    object.push("End date: " + endDateParam);
    object.push("");
    object.push("Agent compensation will be $" + compensationAmountParam + " paid by Company to Agent at Start date.");
    //object.push("");
    //object.push("    Terms are accepted by Company: {CompanyLegalSignature}");
    //object.push("Terms are accepted by Agent: {AgentLegalSignature}");
    return object;
}

var getTemplate = () => {
    switch (templateIndex){
        case "ADVERTISING_TEMPLATE":
            return getTemplateInfo();
            break;
    }
};

export default function getTemplateText(templateId, legalIds, contractTerms) {
    templateIndex = templateId;
    legalIdsValues = legalIds;
    contractTermsValues = contractTerms;
    return getTemplate()
}

