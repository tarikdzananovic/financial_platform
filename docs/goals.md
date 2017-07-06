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

Biz cabinet should have:

- list of Biz own CTI objects
- list of all CTI objects created by other bizes. NOTE: this is temporary feature. We will need to revise this trivial approach
in future to restrict CTI list using some criterias.
- list of ContractTalk objects where Biz is participant

Contract Talk Creation
______________________

Example: BizB selects CTI which was created by BizA. Suppose CTI object has BizA ID as 'Company' (selected when CTI was created).
BizB should agree to have its ID stored as 'Agent' to proceed. Once it is done CTI will have all IDs assigned.
CT object can be created and registered in the system at this point.

CT object
_________

- CT.contract_template = selected_CTI.contract_template
- CT.legalIDs = <see example above>
- CT.contractTerms = selected_CTI.contractTerms
- CT.ref_to_original_CTI = selected_CTI
- CT.message_seq = <list of messages>

Negotiations via message exchange
_________________________________

Given certain *Contract Talk* object we have all IDs already assigned. The rest of contract talk is to come
to common term values.

We need to build CT messages sequence (part of CT object). Each CT message has ref to CT object, sender biz, recepient biz,
term values and comment.

First message is generated upon CT object creation. Example: sender will be BizB (who has selected CTI),
recepient BizA (creator os selected CTI), term values are coming from original CTI object. Both BizA and BizB should be able
either to accept current terms or continue negotiation by modifying term values and sending new message to counterparty to
consider new term values.

New term values are saved into CT.contractTerms upon message sending to maintain latest version of contract terms.
Each new message should be added to CT.message_seq. Whole sequence should be managed like private chat.

Contract terms acceptance
_________________________

Each talking party can initiate acceptance of current contract terms using button 'Accept Terms'.
E.g. BizB may accept contract terms first.
BizA should get message with notice that counterparty have accepted terms. Then BizA should be given choice:
either to 'Accept Terms' or 'Continue Negotiations'.

If 'Continue Negotiations' is choosen than BizB should have notice that acceptance offer was
declined and negotiations continue like nothing happen.

If 'Accept Terms' is chosen THEN new Contract object is created and registered into the system.

Contract object
===============

C.contract_template = CT.contract_template
C.legalIDs = CT.legalIDs
C.contractTerm = CT.contractTerm # this is latest version after both parties accepted
