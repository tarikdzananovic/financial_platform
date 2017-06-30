Contract Negotiations
=====================

Contract Template (CTmpl)
-------------------------

CTmpl has:

- CTmpl.text where it is possible to fill blank spaces to create a contract. Look at test-contract-template.txt as simple examples. Informal and more complete example: https://freelegalforms.uslegal.com/employment-contracts/marketing-and-advertising-agreement/
- list of IDs used CTmpl text -- CTmpl.legalIDs
- list of contract terms used CTmpl text -- CTmpl.contractTermKeys
- list of contract term value types -- CTmpl.contractTermValueTypes

For test template text we have attributes:
 ctmpl.text = open('test-contract-template.txt').readlines()
 ctmpl.legalIDs = {'CompanyLegalID': None, 'AgentLegalID': None}
 ctmpl.contractTermKeys = ['AgentServiceType', 'StartDate', 'EndDate', 'CompensationAmount']
 ctmpl.contractTermValueTypes = [string, date, date, double]

Contract Talk Invitation (CTI)
------------------------------

CTI object is created by Biz. Biz should set CTI object attributes:

on first screen:
- CTI.contract_template <- ..., choose *Contract Template* from list of available contract templates
- CTI.legalIDs <- CTI.contract_template.legalIDs
- CTI.contractTerms <- dict(keys: CTI.contract_template.contractTermsKeys, values: all None)

on second screen:
- CTI.legalIDs -- specify Biz role by setting appropriate item to be Biz legal ID.
E.g. if Biz is advertiser then assignment to be used: CTI.legalIDs['AgentLegalID'] <- Biz.legalID
- optionally specify some contract term values: CTI.contractTerm['CompensationAmount'] <- 200.0
- submit CTI object

Once CTI object created it should become visible for all Bizes in the system.
Counterparty Biz (cBiz) should be able to select interesting CTI. Once CTI is selected by cBiz
the *Contract Talk* object is created.

Contract Talk
-------------

*Contract Talk* is the established communication channel between two *Biz* parties.
*Contract Talk* keeps three version of contractTerms, one per Biz party and *AcceptedTerms*. 
Each party can either show it's own term value or accept counterparty variant.
Once term is accepted it is stored in *AcceptedTerms*.

Once all terms are ok then both parties need to accept contract terms from *AcceptedTerms* dict.
Acceptence by all parties creates *Contract*.

Contract
--------

