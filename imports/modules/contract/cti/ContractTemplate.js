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
};

/*var addMapSubObject  = (object, key, value) => {
    object[key] = value;
    return object;
};*/

var getMapObjectType = (type, inputName) => {
    var object = {};
    object.type= type;
    object.inputName = inputName;

    //TODO:: get Values from API
    var value = [];

    var value1 = {};
    var value2= {};
    value1.name = "youtube_b_lclz";
    value1.shortDescription = "YouTube localized banners";
    value1.description= "ad campaing using YouTube video banners locallized for you biz service area";
    value1.docUrl = "";

    value2.name = "fb_lclz_banners";
    value2.shortDescription = "FaceBook localized ad campaing";
    value2.description = "ad campaing runnning on FaceBook tuned for you biz service area";
    value2.docUrl = "";

    value.push(value1);
    value.push(value2);
    object.value = value;
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
    contractTerms["Agent Service Types"] = getMapObjectType("grid_check", "agentServiceTypes");
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