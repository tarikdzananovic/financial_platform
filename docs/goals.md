Contract Negotiations
=====================

Biz cabinet
-----------

Biz cabinet should have:

- list of Biz own CTI objects with option to create new CTI
- list of all CTI objects created by other bizes. NOTE: this is temporary feature. We will need to revise this trivial approach
in future to restrict CTI list using some criterias.
- list of ContractTalk objects where Biz is participant
- list of Contract objects where Biz is participant


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

Contract Talk Creation
______________________

Example: BizB selects CTI which was created by BizA. Suppose CTI object has BizA ID as 'Company' (selected when CTI was created).
BizB should agree to have its ID stored as 'Agent' to proceed. Once it is done CTI will have all IDs assigned.
CT object can be created and registered in the system at this point.

CT object
_________

- CT.contract_template = selected_CTI.contract_template
- CT.legalIDs = ...
- CT.contractTerms = selected_CTI.contractTerms
- CT.ref_to_original_CTI = selected_CTI
- CT.message_seq = ..list of messages..

CT message viewer
_________________

CT message viewer should be build based on idea of chat. It should show CT.message_seq and CT message editor screen.

First message in CT.message_seq is generated upon CT object creation. The term values are coming from original CTI object.

If user selects latest message then CT message editor screen should show:
- editable contract terms
- buttons 'Accept Terms', 'Submit New Terms', 'Cancel'.

For all other messages CT message editor is read-only.

'Submit New Terms' button should save edited term values into CT.contractTerms and send notice to counterparty.
Each new message should be added to CT.message_seq. New messages should attract attention by hilighting corresponding
entry in Biz cabinent's CT list.

Contract terms acceptance
_________________________

Each talking party can initiate acceptance of current contract terms using button 'Accept Terms'.

E.g. BizB may accept contract terms first.
BizA should get message with notice that counterparty have accepted terms. Then BizA should be given choice:
either to 'Accept Terms and Create Contract' or 'Continue Negotiations'.

If 'Continue Negotiations' is choosen than BizB should have notice that acceptance offer was
declined and negotiations continue like nothing happen.

If 'Accept Terms and Create Contract' is chosen THEN new Contract object is created and registered into the system.

Contract object
---------------

- C.contract_template = CT.contract_template
- C.legalIDs = CT.legalIDs
- C.contractTerm = CT.contractTerm # this is latest version after both parties accepted
