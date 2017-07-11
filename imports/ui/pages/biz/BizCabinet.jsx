import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import { Meteor} from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bizes } from '../../../api/bizes.js';
import { ContractInvites } from '../../../api/contracts/contractInvites.js';

import { Bert} from 'meteor/themeteorchef:bert';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import getTemplateText from '../../../contract/cti/TemplateText'


class BSTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ctConfirmShown: false,
            agreedTermsChecked: false,
            interestedBizRoleName: undefined
        };

        this.onClickHandled = this.onClickHandled.bind(this);
    }

    componentWillReceiveProps(nextProps, nextState) {

        if(nextProps.data) {
            for (var type in nextProps.data.legalIds) {

                if(!nextProps.data.legalIds[type].value) {
                    this.setState({
                        interestedBizRoleName: type
                    });
                }
            }
        }


    }

    onClickHandled() {

        if(!this.state.ctConfirmShown) {
            this.setState({
                ctConfirmShown: true
            });
        }
        else {
            if(this.state.agreedTermsChecked) {

                var legalIdsOutput = [], item;

                for (var type in this.props.data.legalIds) {
                    item = {};
                    if(!this.props.data.legalIds[type].value) {
                        item.value = this.props.interestedBizLegalId;
                    } else {
                        item.value = this.props.data.legalIds[type].value;
                    }
                    item.name = type;
                    legalIdsOutput.push(item);
                }

                let contractTalk = {
                    contractInviteId: this.props.data.contractInviteId,
                    legalIds: legalIdsOutput
                };

                const confirmation = 'Contract talk added';

                Meteor.call('contractTalks.upsert', contractTalk, function(error, response) {
                    if (error) {
                        console.log("Error: " + JSON.stringify(error));
                        Bert.alert(error.reason, 'danger');
                    } else {
                        //TODO:: Route to proper contract talk window, and delete Bert alert below if redundant
                        Bert.alert(confirmation, 'success');
                    }
                });

                Bert.alert("Contract talk to be implemented!", 'success');
            }
            else {
                Bert.alert("You have to agree on storing your ID so we can proceed!", 'danger');
            }

        }
    }

    onAgreedTermsChanged(e) {
        this.setState({
            agreedTermsChecked: e.target.checked
        })
    }

    getTemplateText(templateId, legalIds, contractTerms){

        var objectTemplate = getTemplateText(templateId, legalIds, contractTerms);

        if(objectTemplate) {
            var contractTerms = objectTemplate.map((item) => {
                return (
                    <div className="row">
                        <div className="col-sm-12">
                            <p>{item}</p>
                        </div>
                    </div>
                );
            });
            return contractTerms;
        }
    }

    render() {
        if (this.props.data) {

            var contractTermsOutput = [], item;

            for (var type in this.props.data.contractTerms) {
                item = {};
                item.value = this.props.data.contractTerms[type].value;
                item.name = type;
                contractTermsOutput.push(item);
            }

            var legalIdsOutput = [], item;

            for (var type in this.props.data.legalIds) {
                item = {};
                item.value = this.props.data.legalIds[type].value;
                item.name = type;
                legalIdsOutput.push(item);
            }

            return (
                <div>
                    <p><strong>Detailed Information:</strong></p>
                    <BootstrapTable data={ legalIdsOutput }>
                        <TableHeaderColumn dataField='name' isKey={true}>Legal ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='value'>Value</TableHeaderColumn>
                    </BootstrapTable>
                    <br/>
                    <BootstrapTable data={ contractTermsOutput }>
                        <TableHeaderColumn dataField='name' isKey={true}>Contract Term</TableHeaderColumn>
                        <TableHeaderColumn dataField='value'>Value</TableHeaderColumn>
                    </BootstrapTable>
                    <br/>
                    {this.getTemplateText(this.props.data.templateId, this.props.data.legalIds, this.props.data.contractTerms)}
                    <br/>
                    <div className="row">
                    {
                        (this.props.canStartContractTalk)
                            ? <section className="col col-md-4 col-md-offset-7">
                                <button className="btn btn-block btn-primary" onClick={this.onClickHandled}>Start Contract Talk</button>
                            {
                                (this.state.ctConfirmShown)
                                ? <label className="checkbox">
                                    <input type="checkbox" name="contractTalkConfirmation" id="contractTalkConfirmation" onChange={(e) => this.onAgreedTermsChanged(e)}/>
                                    <i/>I agree to have my legal ID stored as '{this.state.interestedBizRoleName}'
                                </label> : <p></p>
                            }
                              </section> : <p></p>
                    }
                    </div>

                </div>);
        } else {
            return (<p>?</p>);
        }
    }
}


class BizCabinet extends Component {

    constructor(props) {
        super(props);

        this.state = {
            biz: {},
            editLocation : window.location.hash.replace('cabinet', 'edit'),
            ctiLocation: window.location.hash.replace('cabinet', 'contractInvite'),
            publicCabinet : false,
            contractInvites : [],
            contractInvitesOtherBizes: []
        };
    }

    componentWillReceiveProps(nextProps, nextState) {

        this.setState({
            biz: nextProps.biz,
            publicCabinet : nextProps.biz.userId !== Meteor.user()._id,
            contractInvites: nextProps.contractInvites,
            contractInvitesOtherBizes: nextProps.contractInvitesOtherBizes
        });
    }

    isExpandableRow(row) {
        if(row._id)
            return true;
        else return false;
    }

    expandComponent(row, canStartContractTalk, interestedBizLegalId) {

        var data = {};
        data.templateId = row.templateId;
        data.contractTerms = row.contractTerms;
        data.legalIds = row.legalIds;
        data.contractInviteId = row._id;

        return (
            <BSTable data={ data} canStartContractTalk= { canStartContractTalk} interestedBizLegalId = {interestedBizLegalId}/>
        );
    }

    render() {

        var getOptions = function (data) {
            const options = {
                page: 1,
                sizePerPageList: [ {
                    text: '10', value: 10
                }, {
                    text: '20', value: 20
                }, {
                    text: 'All', value: data
                } ], // you can change the dropdown list for size per page
                sizePerPage: 10,
                pageStartIndex: 1, // where to start counting the pages
                paginationSize: 3,  // the pagination bar size.
                prePage: 'Prev', // Previous page button text
                nextPage: 'Next', // Next page button text
                firstPage: 'First', // First page button text
                lastPage: 'Last', // Last page button text
                prePageTitle: 'Go to previous', // Previous page button title
                nextPageTitle: 'Go to next', // Next page button title
                firstPageTitle: 'Go to first', // First page button title
                lastPageTitle: 'Go to Last', // Last page button title
                paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
                paginationPosition: 'top',  // default is bottom, top and both is all available
                onlyOneExpanding: true,
                expandBodyClass: function(row, rowIndex, isExpanding) {
                    if (!isExpanding) {
                        return 'current-is-hidden';
                    } else {
                        if (rowIndex > 1) {
                            return 'custom-expand-body-1';
                        } else {
                            return 'custom-expand-body-0';
                        }
                    }
                },
                expandParentClass: 'custom-expand-parent'  // expandParentClass also accept callback function
            };
            return options;
        };


        if(!this.state.publicCabinet){

            return (
                <div>
                    <header id="header" className="animated fadeInDown">
                        <div id="logo-group"></div>
                        <span id="extr-page-header-space">
                            BIZ {this.state.biz.name} Cabinet
                        </span>
                    </header>

                    <div className="well">
                        <ul className="demo-btns">
                            <li>
                                <a href={this.state.editLocation} className="btn bg-color-blueLight txt-color-white">
                                    <i className="fa fa-edit fa-5x"></i> Edit Biz</a>
                            </li>
                            <li>
                                <a href={this.state.ctiLocation} className="btn bg-color-green txt-color-white">
                                    <i className="fa fa-file-text-o fa-5x"></i> Create CTI</a>
                            </li>
                        </ul>
                    </div>
                    <div className="well">
                        <p>My CTIs</p>
                        <BootstrapTable data={ this.state.contractInvites }
                                        pagination={ true }
                                        options={ getOptions(this.state.contractInvites.length) }
                                        expandableRow={ this.isExpandableRow }
                                        expandComponent={ (e) => this.expandComponent(e, false)}
                        >
                            <TableHeaderColumn dataField='_id' isKey={ true }>CTI ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='template'>Template Name</TableHeaderColumn>
                        </BootstrapTable>

                        <br />
                        <br />
                        <p>Other CTIs</p>
                        <BootstrapTable data={ this.state.contractInvitesOtherBizes }
                                        pagination={ true }
                                        options={ getOptions(this.state.contractInvitesOtherBizes.length) }
                                        expandableRow={ this.isExpandableRow }
                                        expandComponent={(e) => this.expandComponent(e, true, this.state.biz.legalId) }
                        >
                            <TableHeaderColumn dataField='_id' isKey={ true }>CTI ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='template'>Template Name</TableHeaderColumn>
                        </BootstrapTable>

                    </div>
                </div>
            )
        }
        else {
            return(
                <div>
                    <header id="header" className="animated fadeInDown">
                        <div id="logo-group"></div>
                        <span id="extr-page-header-space">
                            BIZ {this.state.biz.name} Cabinet
                        </span>
                    </header>
                    <div className="well">
                        <BootstrapTable data={ this.state.contractInvites }
                                        pagination={ true }
                                        options={ getOptions(this.state.contractInvites.length) }
                                        expandableRow={ this.isExpandableRow }
                                        expandComponent={ (e) => this.expandComponent(e, false) }
                        >
                            <TableHeaderColumn dataField='_id' isKey={ true }>CTI ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='template'>Template Name</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
            );
        }

    }
}

BizCabinet.propTypes = {
    biz: PropTypes.object,
    contractInvites: PropTypes.array,
    contractInvitesOtherBizes: PropTypes.array,
};

export default createContainer(({params}) => {

    const subscriptionBizes = Meteor.subscribe('bizes');
    const loadingBizes =  !subscriptionBizes.ready();
    const biz = Bizes.findOne({_id: params.id}, {fields: { name: 1, userId: 1, legalId: 1 }});
    const bizExists = !loadingBizes && !!biz;

    const subscriptionContractInvites = Meteor.subscribe('contractInvites');
    const loadingContractInvites =  !subscriptionContractInvites.ready();
    const contractInvites = ContractInvites.find({bizId: params.id}).fetch();
    const contractInvitesExist = !loadingContractInvites && !!contractInvites;

    const contractInvitesOtherBizes = ContractInvites.find({bizId: {$ne: params.id}}).fetch();
    const contractInvitesOtherBizesExist = !loadingContractInvites && !!contractInvitesOtherBizes;

    return {
        biz: bizExists ? biz : {},
        contractInvites: contractInvitesExist ? contractInvites : [],
        contractInvitesOtherBizes: contractInvitesOtherBizesExist ? contractInvitesOtherBizes : [],
    };

}, BizCabinet);