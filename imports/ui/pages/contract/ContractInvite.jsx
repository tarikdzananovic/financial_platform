import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { hashHistory} from 'react-router';

import Wizard from '../../components/forms/wizards/Wizard';
import getContractInviteTemplate from '../../../modules/contract/cti/ContractTemplate'
import { Bizes } from '../../../api/bizes.js';

import Iframe from 'react-iframe'


class BSTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data) {
            return (
                <p>
                    <strong>Description:</strong> {this.props.data}
                </p>);
        } else {
            return (<p>?</p>);
        }
    }
}

class ContractTemplate extends Component {

    constructor(props){
        super(props);
    }

    render() {

        var getLegalIds = Object.keys(this.props.template.legalIds).map(function(key) {
            return (
                <li key={key}>
                    <span className="text">{key}</span>
                </li>
            );
        });

        var contractTerms = Object.keys(this.props.template.contractTerms).map(function(key) {
            return (
                <li key={key}>
                    <span className="text">{key}</span>
                </li>
            );
        });

        return (
            <div>

                <div className="row">
                    <section className="col-sm-6">
                        Template Info for {this.props.template.template} :
                    </section>
                </div>
                <br/>

                <div className="row">
                    <section  className="col-sm-6">
                        <label> Legal IDs used in Contract: </label>
                        <ul>{getLegalIds}</ul>
                    </section>
                    <section  className="col-sm-6">
                        <label> Terms in Contract: </label>
                        <ul>{contractTerms}</ul>
                    </section>
                </div>



            </div>
        );
    }
}

class ContractInvite extends Component {

    constructor(props) {
        super(props);

        var template = {};
        template.actors = [];

        this.state = {
            templateVisible : false,
            template : template,
            templateId: "",
            templateText: [],
            currentStep : 1,
            btnNextText : 'Next',
            contractInvite: {},
            biz: {},
        };

        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
        this._onWizardComplete = this._onWizardComplete.bind(this);
    }

    componentDidMount() {

        this.setState({
            biz: this.props.biz
        });
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            biz: nextProps.biz
        });
    }

    handleNextClick(){
        switch (this.state.currentStep){
            case 1:
                this.validateStep1();
                if($(this.step1Form).valid()){
                    this.linkNext.click();
                }
                break;
            case 2:
                this.validateStep2();
                if($(this.step2Form).valid()){
                    this.linkNext.click();
                }
                break;
        }
    }
    handlePreviousClick(){
        this.linkPrevious.click();
    }

    onTemplateSelected(e) {
        var objectTemplate = getContractInviteTemplate(e.target.value);
        var templateVisible = objectTemplate.template ? true : false;
        this.setState({
            template : objectTemplate.template,
            templateId: e.target.value,
            templateVisible : templateVisible,
            templateText : objectTemplate.text
        });
    }
    onRoleChange(e) {
        let template = this.state.template;
        template.role = e.target.value;
        template.legalIds[template.role].value = this.state.biz.legalId;
        this.setState({
            template : template,
        });
    }

    onContractTermChange(e, key) {
        let template = this.state.template;
        template.contractTerms[key].value = e.target.value;
        this.setState({
            template : template,
        });
    }

    _onWizardComplete(data){

        let contractInvite = {
            biz: this.state.biz,
            template: this.state.template.template,
            templateId: this.state.templateId,
            legalIds: this.state.template.legalIds,
            contractTerms: this.state.template.contractTerms,
            indexer: this.state.template.indexer
        };

        const confirmation = 'Contract invite added';

        Meteor.call('contractInvites.upsert', contractInvite, function(error, response) {
            if (error) {
                console.log("Error: " + JSON.stringify(error));
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert(confirmation, 'success');
                hashHistory.push('/biz/' + contractInvite.biz._id + '/cabinet');
            }
        });
    }

    _onStepChange(data){
        this.setState({ currentStep: data.step, btnNextText: data.isLast ? 'Complete' : 'Next'});
    }

    validateStep1(){
        $(this.step1Form).validate({
            rules: {
                template: {
                    required: true
                }
            },

            // Messages for form validation
            messages: {
                template: {
                    required: 'Template selection is mandatory',
                }
            },
            errorElement: 'em',
            errorClass: 'invalid',
            highlight: function (element, errorClass, validClass) {
                $(element).addClass(errorClass).removeClass(validClass);
                $(element).parent().addClass('state-error').removeClass('state-success');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(errorClass).addClass(validClass);
                $(element).parent().removeClass('state-error').addClass('state-success');
            },
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            }
        });
    }

    validateStep2(){
        jQuery.validator.addMethod("greaterThan", function(value, element, params) {
            if ($(params[0]).val() != '') {
                if (!/Invalid|NaN/.test(new Date(value))) {
                    return new Date(value) > new Date($(params[0]).val());
                }
                return isNaN(value) && isNaN($(params[0]).val()) || (Number(value) > Number($(params[0]).val()));
            };
            return true;
        },'Must be greater than {1}.');
        $(this.step2Form).validate({
            rules: {
                actor: {
                    required: true
                },
                initiatorId: {
                    required: true
                },
                endDate: {
                    greaterThan: ["#startDate","Start Date"]
                }
            },

            messages: {
                actor: {
                    required: 'Biz Role selection is mandatory',
                }
            },
            errorElement: 'em',
            errorClass: 'invalid',
            highlight: function (element, errorClass, validClass) {
                $(element).addClass(errorClass).removeClass(validClass);
                $(element).parent().addClass('state-error').removeClass('state-success');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(errorClass).addClass(validClass);
                $(element).parent().removeClass('state-error').addClass('state-success');
            },
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            }
        });
    }

    getActorList() {
        let object = this.state.template.actors;
        var actorList = Object.keys(object).map(function(key) {
            return (
                <option key={key} value={key}>{object[key]}</option>
            );
        }.bind(this));
        return actorList;
    }

    getLegalIdInput(){
        if(this.state.template.legalIds){
            var key = this.state.template.role;
            if(key){
                var value = this.state.template.legalIds[this.state.template.role];
                return(
                    <div className="form-group col-md-12">
                        <label className="col-md-3 control-label">{key}</label>
                        <div className="col-md-5">
                            <input className="form-control" type="text" name='initiatorId' value={this.state.biz.legalId} placeholder={key} disabled onChange={(e) => this.onLegalIdChange(e, key)}/>
                        </div>
                    </div>
                );
            }
        }
    }

    isExpandableRow(row) {
        if(row.description){
            return true;
        }
        return false;
    }

    expandComponent(row) {
        return (
            <BSTable data={ row.description}/>
        );
    }


    onRowSelect(row, isSelected, e) {
        if(!isSelected && this.refs.agentServiceTypes.state.selectedRowKeys.length === 1){
            return false;
        }
    }

    handleExpand(rowKey, isExpand) {
        //not working
        if (!isExpand && this.refs.agentServiceTypes.state.selectedRowKeys.length === 1) {
            return false;
        }
        return true;
    }


    getTable(object, inputName){
        var keyList = [];
        for(var i = 0 ; i < object.length;i++){
            if(object[i].name){
                keyList.push(object[i].name);
            }
        }
        const options = {
            expandRowBgColor: 'rgb(207, 215, 223)',
            expanding: keyList,
            expandBy: 'column',
            onExpand: this.handleExpand.bind(this)
        };

        var selectRowProp = (keys) => {
            const properties = {
                mode: 'checkbox',
                clickToSelect: true,  // click to select, default is false
                clickToExpand: true, // click to expand row, default is false
                selected: keys,
                onSelect: this.onRowSelect.bind(this)
            };
            return properties;
        };
        return (
            <BootstrapTable ref= {inputName}
                            data={ object }
                            options={ options}
                            expandableRow={ this.isExpandableRow }
                            expandComponent={ (e) => this.expandComponent(e)}
                            selectRow={ selectRowProp(keyList)}
            >
                <TableHeaderColumn dataField="name" isKey={true}>Name</TableHeaderColumn>
                <TableHeaderColumn dataField="shortDescription" >Short Description</TableHeaderColumn>
            </BootstrapTable>
        );
    }

    getContractTermsInputs(){
        if(this.state.template.contractTerms && this.state.template.role){
            let object = this.state.template.contractTerms;
            var contractTerms = Object.keys(object).map(function(key) {
                if(object[key].type === 'grid_check'){
                    return(
                        <div className="form-group col-md-12">
                            <label className="col-md-3 control-label">{key}</label>
                            <div className="col-md-5">
                                {this.getTable(object[key].value, object[key].inputName)}
                            </div>
                        </div>
                    );
                }
                else{
                    return (
                        <div className="form-group col-md-12">
                            <label className="col-md-3 control-label">{key}</label>
                            <div className="col-md-5">
                                <input className="form-control" id={object[key].inputName} name={object[key].inputName} type={object[key].type} value={object[key].value} placeholder={key} onChange={(e) => this.onContractTermChange(e, key)}/>
                            </div>
                        </div>
                    );
                }
            }.bind(this));
            return contractTerms;
        }
    }

    getTemplateText(){
        if(this.state.templateText){
            let object = this.state.templateText;
            var contractTerms = object.map((item) => {
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

        return (

            <div>
                <header id="header" className="animated fadeInDown">
                    <div id="logo-group"></div>
                    <span id="extr-page-header-space">
                        New CTI Wizard
                    </span>
                </header>


                <div className="widget-body">
                        <Wizard className="col-sm-12"
                                onComplete={this._onWizardComplete}
                                onStepChange={(e) => this._onStepChange(e)}
                        >

                            <div className="form-bootstrapWizard clearfix">
                                <ul className="bootstrapWizard">
                                    <li data-smart-wizard-tab="1">
                                        <span className="step">1</span> <span
                                        className="title">Choose CTI Template</span>
                                    </li>
                                    <li data-smart-wizard-tab="2">
                                        <span className="step">2</span> <span
                                        className="title">Enter CTI Information</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content">
                                <div className="tab-pane" data-smart-wizard-pane="1">
                                    <br/><br/>

                                    <h4><strong>Step 1 </strong> - Choose template</h4>

                                    <br/>
                                    <form noValidate="novalidate" ref={ form => (this.step1Form = form) }>
                                        <fieldset>
                                            <div className="form-group col-md-12">
                                                <div className="col-md-6">
                                                    <select className="form-control" name="template" defaultValue={"NONE"} onChange={(e) => this.onTemplateSelected(e)}>
                                                        <option value="NONE" disabled={true}>Contract Template</option>
                                                        <option value="ADVERTISING_TEMPLATE">Advertising Template</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </form>
                                    {
                                        this.state.templateVisible ? <div><ContractTemplate template={this.state.template}/><br/></div> : null
                                    }
                                    {this.getTemplateText()}

                                </div>


                                <div className="tab-pane" data-smart-wizard-pane="2">
                                    <br/><br/>

                                    <h4><strong>Step 2 </strong> - Enter CTI Information</h4>
                                    <br/>
                                    <form noValidate="novalidate" ref={ form => (this.step2Form = form) }>
                                        <fieldset>
                                            <div className="form-group col-md-12">
                                                <label className="col-md-3 control-label">Select Biz Role</label>
                                                <div className="col-md-5">
                                                    <select className="form-control" name="actor" defaultValue={"NONE"} onChange={(e) => this.onRoleChange(e)}>
                                                        <option value="NONE" disabled={true}>Select</option>
                                                        {this.getActorList()}
                                                    </select>
                                                </div>
                                            </div>

                                            {this.getLegalIdInput()}

                                            {this.getContractTermsInputs()}

                                        </fieldset>
                                    </form>
                                </div>

                                <div className="form-actions hide">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <ul className="pager wizard no-margin">
                                                <li className="previous" data-smart-wizard-prev="">
                                                    <a href="#" className="btn btn-default" ref={input => this.linkPrevious = input}>
                                                        Previous </a>
                                                </li>
                                                <li className="next" data-smart-wizard-next="">
                                                    <a href="#" className="btn txt-color-darken" ref={input => this.linkNext = input}>
                                                        {this.state.btnNextText} </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <ul className="pager wizard no-margin">
                                                <li className="previous">
                                                    <a onClick={() => this.handlePreviousClick()} className="btn btn-default"
                                                       data-smart-wizard-prev2="">
                                                        Previous </a>
                                                </li>
                                                <li className="next">
                                                    <a onClick={() => this.handleNextClick()} className="btn txt-color-darken">
                                                        {this.state.btnNextText} </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Wizard>
                </div>
            </div>
        );
    }
}

export default createContainer(({params}) => {

    const subscription = Meteor.subscribe('bizes');
    const loading =  !subscription.ready();
    const biz = Bizes.findOne({_id : params.id});
    const bizExists = !loading && biz;
    return {
        biz: bizExists ? biz : {},
    };

}, ContractInvite);


