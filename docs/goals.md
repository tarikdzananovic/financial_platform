Contract Negotiations
=====================

Contract Blank (CB)
-------------------

*Contract Blank* is a text where it is possible to fill blank spaces to create a contract.
E.g. https://freelegalforms.uslegal.com/employment-contracts/marketing-and-advertising-agreement/

*Contract Blank* object has:

- text of contract with ommisions of participants identities as well as some or all contract term values.
- dates...
- implicit IDs for all contract participants
- term names and specification of possible term values. Possible term values could be compensation amount ranges,
enumerations of service types etc.

Having *Contract Blank* object the users of the system should be able to create *Contract* by filling blanks.

Implicit ID is generic name of contract participant. Such approach is widely used 
in contract writing. E.g. contract have paragraph naming some unspecified company as an Agent. Upon initiation
of *Contract Talk* the contract participants must be explicitly identified by assigning explicit IDs to implicit 
ones used in *Contract Blank*

*Contract Blank* with some but not all term values assigned is *Partially Filled Contract Blank*.
It is also possible to attach some term value ranges or fixed term values to *PFCB* narrowing down negtiation path.

Contract Talk Invitation (CTI)
------------------------------

*CTI* object is created by certain *Biz* to indicate the interest of entering in the contract.
*CTI* object should have enough information to start contract negotiations.
Thus *CTI* object has ref to *Partially Filled Contract Blank*.
*CTI* also should assign explicit ID to contract participant intended for the *Biz* which creates the *CTI*.

Interested counterparty can use particular *CTI* object to initiate *Contract Talk*.
Request to start *Contract Talk* using particular *CTI* coming from counterparty
will supply missing explicit identity of contract participant. After that *Contract Talk* can be initiated
using *PFCB* from *CTI* object.

Contract Talk
-------------

*Contract Talk* is the established communication channel between two *Biz* parties.
*Contract Talk* is used to completely fill *PFCB*. Once filled we have all data to apply electronic signature 
and create *Contract*

Contract
--------

*Contract* is signed tuple (*Contract Blank*, *ImplicitID -> ExplicitID map*, *Term Values*).
*Contract* is convertible to human- and machine- readable forms. In human-readable form *Contract* should have no 
legal difference from contract done by usual means.


Code examples
=============

Contract Blank Creation
-----------------------

```
cb = ContractBlank()
cb.id = ...
cb.short_name = "EACA"
cb.name = "EXCLUSIVE ADVERTISING AND CONSULTING AGREEMENT"
cb.text = ... # see https://freelegalforms.uslegal.com/employment-contracts/marketing-and-advertising-agreement/
cb.dates = ...
cb.implicit_ids = {"Agent": None, "Company": None} # keys are used in cb.text
cb.terms = {"duties": AdContractDutiesList(), "compensation": MoneyRange(0, 1000), "state": USStatesList()}

print "ALL SET" if cb.isCompletelyFilled() else "PARTIALLY FILLED"
```

Contract Talk Invite Setup
--------------------------

```
cb = GetContractBlankByName("EACA")

# create contract talk invite. It has contract blank which defines possible contact talk.
# it is possible to fill some term values to narrow negotiations from begining
cti = CTI()
cti.cb = GetContractBlankByName("EACA")
cti.cb.implicit_ids["Company"] = biz.official_identification # biz in Contract will be designated as Company
cti.cb.dates = ...
cti.cb.terms["duties"] = InternetAdCampaing() # expected duties of Agent: ad campaing
cti.cb.compensation = MoneyRange(0, 200) # compensation between $0 and $200
biz.addActiveCTI(cti) # biz start showing its interested in contract specified by PFCB
```

Contract Talk
-------------

```
# other biz session

cti_id = ...
cti = getCTI(cti_id) # now we have CTI
ct = obiz.sendContractTalkRequest(cti) # other side gets notification, contract talk object returns

```
