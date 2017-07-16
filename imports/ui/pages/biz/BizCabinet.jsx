import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import { Meteor} from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert} from 'meteor/themeteorchef:bert';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { hashHistory} from 'react-router';

import { Bizes } from '../../../api/bizes.js';
import { ContractInvites } from '../../../api/contracts/contractInvites.js';
import { ContractTalks } from '../../../api/contracts/contractTalks.js';
import getTemplateText from '../../../modules/contract/cti/TemplateText'
import BizCabinetApi from '../../../modules/biz/BizCabinetApi';


class BSTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ctConfirmShown: false,
            agreedTermsChecked: false,
            interestedBizRoleName: undefined,
        };

        this.onClickHandled = this.onClickHandled.bind(this);
        this.onGoToContractTalk = this.onGoToContractTalk.bind(this);

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

    onGoToContractTalk() {
        hashHistory.push('/biz/' + this.props.data.interestedBiz._id + '/contractTalk/' + this.props.data.contractTalk._id);
    }

    onClickHandled() {

        if(!this.state.ctConfirmShown) {
            this.setState({
                ctConfirmShown: true
            });
        }
        else {
            if(this.state.agreedTermsChecked) {
                BizCabinetApi.insertContractTalk(this.props.data, this.props.data.interestedBiz);
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

    getContractInviteFooter(){

        if(this.props.canStartContractTalk) {
            if(this.props.data.contractTalk) {
                return (
                    <div>
                        <section className="col col-md-4 col-md-offset-7">
                            <button className="btn btn-block btn-primary" onClick={this.onGoToContractTalk}>Go to Contract Talk</button>
                        </section>
                    </div>
                );
            }
            else {
                return (
                  <div>
                      <section className="col col-md-4 col-md-offset-7">
                          <button className="btn btn-block btn-primary" onClick={this.onClickHandled}>Start Contract Talk</button>
                          {
                              (this.state.ctConfirmShown)
                                  ? <label className="checkbox">
                                  <input type="checkbox" name="contractTalkConfirmation" id="contractTalkConfirmation" onChange={(e) => this.onAgreedTermsChanged(e)}/>
                                  <i/>I agree to have my legal ID stored as '{this.state.interestedBizRoleName}'
                              </label> : <p></p>
                          }
                      </section>

                  </div>
                );
            }
        }
        else {
            return(
              <p></p>
            );
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
                        this.getContractInviteFooter()
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
            contractInvitesOtherBizes: [],
            contractTalks: []
        };
    }

    componentWillReceiveProps(nextProps, nextState) {

        let contractTalksShortened = [];

        nextProps.contractTalks.map((contractTalk) => {
            let counterBizName = nextProps.biz._id != contractTalk.ctNegotiatorBizId ? contractTalk.ctNegotiatorBiz.name : contractTalk.contractInvite.biz.name;
            contractTalksShortened.push({_id: contractTalk._id, template: contractTalk.contractInvite.template, counterBizName: counterBizName});
        });

        this.setState({
            biz: nextProps.biz,
            publicCabinet : nextProps.biz.userId !== Meteor.user()._id,
            contractInvites: nextProps.contractInvites,
            contractInvitesOtherBizes: nextProps.contractInvitesOtherBizes,
            contractTalks: contractTalksShortened
        });
    }

    isExpandableRow(row) {
        if(row._id)
            return true;
        else return false;
    }

    expandComponent(row, canStartContractTalk, interestedBiz) {

        var data = row;
        data.interestedBiz = interestedBiz;

        return (
            <BSTable data={ data} canStartContractTalk= { canStartContractTalk}/>
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

                    <ul id="myTab1" className="nav nav-tabs bordered">
                        <li className="active">
                            <a href="#s1" data-toggle="tab">My Contract Invites</a>
                        </li>
                        <li>
                            <a href="#s2" data-toggle="tab">Other Contract Invites</a>
                        </li>
                        <li>
                            <a href="#s3" data-toggle="tab">My Contract Talks</a>
                        </li>
                    </ul>

                    <div id="myTabContent1" className="tab-content padding-10">
                        <div className="tab-pane fade in active" id="s1">
                            <div>
                                <BootstrapTable data={ this.state.contractInvites }
                                                pagination={ true }
                                                options={ getOptions(this.state.contractInvites.length) }
                                                expandableRow={ this.isExpandableRow }
                                                expandComponent={ (e) => this.expandComponent(e, false)}
                                >
                                    <TableHeaderColumn dataField='_id' isKey={ true }>CTI ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='template'>Template Name</TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="s2">
                            <div>
                                <BootstrapTable data={ this.state.contractInvitesOtherBizes }
                                                pagination={ true }
                                                options={ getOptions(this.state.contractInvitesOtherBizes.length) }
                                                expandableRow={ this.isExpandableRow }
                                                expandComponent={(e) => this.expandComponent(e, true, this.state.biz) }
                                >
                                    <TableHeaderColumn dataField='_id' isKey={ true }>CTI ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='template'>Template Name</TableHeaderColumn>
                                </BootstrapTable>
                            </div>

                        </div>
                        <div className="tab-pane fade" id="s3">
                            <div>
                                <BootstrapTable data={ this.state.contractTalks }
                                                pagination={ true }
                                                options={ getOptions(this.state.contractTalks.length) }
                                >
                                    <TableHeaderColumn dataField='_id' isKey={ true }>CT ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='template'>Template Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='counterBizName'>Counter Biz</TableHeaderColumn>
                                </BootstrapTable>
                            </div>

                        </div>
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
    contractTalks: PropTypes.array
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

    const subscriptionContractTalks = Meteor.subscribe('contractTalks');
    const loadingContractTalks =  !subscriptionContractTalks.ready();
    const contractTalks = ContractTalks.find({ $or: [{ctNegotiatorBizId: params.id}, {ctiOwnerBizId: params.id}]}, { fields: { messages: 0} }).fetch();
    const contractTalksExist = !loadingContractTalks && !!contractTalks;

    if(contractInvitesOtherBizes && contractInvitesOtherBizes.length > 0) {

        for(var i = 0; i < contractInvitesOtherBizes.length; i++){
            let ctiId = contractInvitesOtherBizes[i]._id;

            const contractTalk = ContractTalks.findOne({ctNegotiatorBizId: params.id, contractInviteId: ctiId}, { fields: { _id: 1} });
            contractInvitesOtherBizes[i].contractTalk = contractTalk;
        }
    }

    return {
        biz: bizExists ? biz : {},
        contractInvites: contractInvitesExist ? contractInvites : [],
        contractInvitesOtherBizes: contractInvitesOtherBizesExist ? contractInvitesOtherBizes : [],
        contractTalks: contractTalksExist ? contractTalks : [],
    };

}, BizCabinet);