import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import { Meteor} from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bizes } from '../../../api/bizes.js';
import { ContractInvites } from '../../../api/contracts/contractInvites.js';

import { Bert} from 'meteor/themeteorchef:bert';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


class BSTable extends React.Component {


    onClickHandled() {
        Bert.alert("Contract talk to be implemented!", 'success');
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
                item.value = this.props.data.legalIds[type];
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
                    <div className="row">
                        <section className="col col-md-4 col-md-offset-8">
                            <button className="btn btn-block btn-primary" onClick={this.onClickHandled}>Start Contract Talk</button>
                        </section>
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
            contractInvites : []
        };
    }

    componentWillReceiveProps(nextProps, nextState) {

        this.setState({
            biz: nextProps.biz,
            publicCabinet : nextProps.biz.userId !== Meteor.user()._id,
            contractInvites: nextProps.contractInvites
        });
    }

    isExpandableRow(row) {
        if(row._id)
            return true;
        else return false;
    }

    expandComponent(row) {
        var data = {};
        data.contractTerms = row.contractTerms;
        data.legalIds = row.legalIds;
        return (
            <BSTable data={ data} />
        );
    }

    render() {

        const options = {
            page: 1,
            sizePerPageList: [ {
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: this.state.contractInvites.length
            } ], // you can change the dropdown list for size per page
            sizePerPage: 5,
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
                        <BootstrapTable data={ this.state.contractInvites }
                                        pagination={ true }
                                        options={ options }
                                        expandableRow={ this.isExpandableRow }
                                        expandComponent={ this.expandComponent }
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
                                        options={ options }
                                        expandableRow={ this.isExpandableRow }
                                        expandComponent={ this.expandComponent }
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
};

export default createContainer(({params}) => {

    const subscriptionBizes = Meteor.subscribe('bizes');
    const loadingBizes =  !subscriptionBizes.ready();
    const biz = Bizes.findOne({_id: params.id}, {fields: { name: 1, userId: 1 }});
    const bizExists = !loadingBizes && !!biz;


    const subscriptionContractInvites = Meteor.subscribe('contractInvites');
    const loadingContractInvites =  !subscriptionContractInvites.ready();
    const contractInvites = ContractInvites.find({bizId: params.id}).fetch();
    const contractInvitesExist = !loadingContractInvites && !!contractInvites;

    return {
        biz: bizExists ? biz : {},
        contractInvites: contractInvitesExist ? contractInvites : [],
    };

}, BizCabinet);