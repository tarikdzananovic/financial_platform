import React, { Component } from 'react';
import Moment from '../../components/utils/Moment'
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types'

import { ContractTalks } from '../../../api/contracts/contractTalks.js';
import { ContractInvites } from '../../../api/contracts/contractInvites.js';
import { Bizes } from '../../../api/bizes.js'
import getTemplateText from '../../../modules/contract/cti/TemplateText'
import CloneObject from  '../../../utils/object/CloneObj'
import ContractTalkApi from '../../../modules/contract/ContractTalkApi';

import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';
import '../../../../client/styles/css/react-datepicker.css';

class Message extends Component{
    constructor(props){
        super(props);
    }

    getContractTermsItems = function () {
        if (this.props.msg.type === 'NEW_TERMS') {
            var object = this.props.msg.contractTerms;
            if(object){
                var map = Object.keys(object).map(function (key) {
                    if(object[key].value){
                        if(object[key].type == "grid_check"){
                            return (
                                <div className="row" key={key}>
                                    <div className="col-lg-3">{key}:</div>
                                    <div className="col-lg-6">{object[key].value.shortDescription}</div>
                                </div>
                            );
                        }
                        else {
                            return (
                                <div className="row" key={key}>
                                    <div className="col-lg-3">{key}:</div>
                                    <div className="col-lg-6">{object[key].value}</div>
                                </div>
                            );
                        }

                    }
                });
                return map;
            }
        }
    };

    getContractTerms = function () {
        if (this.props.msg.type === 'NEW_TERMS') {
            var object = this.props.msg.contractTerms;
            if(object){
                return(
                    <div>
                        <br/>
                        <generatedMessage>Update request for terms</generatedMessage>
                        {this.getContractTermsItems()}
                    </div>

                )
            }
        }
    };

    getAcceptanceMessage = function () {
        if (this.props.msg.type === 'ACCEPTANCE') {
            return(
                <div>
                    <br/>
                    <generatedMessage>{this.props.msg.sender.name} {this.props.msg.accepted ? 'accepted' : 'declined'} the terms.</generatedMessage>
                    {this.getContractTermsItems()}
                </div>);
        }
    };

    render() {

        return(
            <div>
                <div className="message-text">
                    <time>
                        <Moment date={this.props.msg.date} />
                    </time>
                    <p className="username"><strong>{this.props.msg.sender.name} posted:</strong></p>
                    {this.props.msg.comment}

                    {this.getContractTerms()}
                    {this.getAcceptanceMessage()}
                </div>
            </div>
        );


    }
}

class MessageContent extends Component{
    constructor(props){
        super(props);
    }

    render() {

        var messageBody = this.props.messages.map((msg) => {
            return (
                <li className="message" key={msg._id}>
                    <Message msg={msg}></Message>
                </li>
            );
        });

        return(
            <ul>{messageBody}</ul>
        );


    }
}

class ContractTalk extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages : this.props.contractTalk.messages ? this.props.contractTalk.messages : [],
            newContractTermsRequest : {},
            originalContractTerms : this.props.contractTermsOriginal,
            updatedContractTerms : this.props.contractTalk.currentContractTerms ? this.props.contractTalk.currentContractTerms : CloneObject(this.props.contractTermsOriginal),
            templateId : "",
            legalIds: [],
            firstMessageMode : undefined,
            lastMessageMode : undefined,
            myBiz: {},
            talkId: undefined,
            ctiOwnerBizId: undefined,
            status: undefined
        };

        this.handleNewTermsClick = this.handleNewTermsClick.bind(this);
        this.handleAcceptTermsClick = this.handleAcceptTermsClick.bind(this);
        this.handleDeclineTermsClick = this.handleDeclineTermsClick.bind(this);
        this.handleShowAcceptance = this.handleShowAcceptance.bind(this);
        this.handleShowNegotiate = this.handleShowNegotiate.bind(this);
        this.handleBackToDefaultClick = this.handleBackToDefaultClick.bind(this);
        this.setStateForProps = this.setStateForProps.bind(this);
        this.handleCreateContract = this.handleCreateContract.bind(this);
    }

    componentDidMount() {
        this.setStateForProps(this.props);
    }

    setStateForProps(props) {
        if (props.contractTalk && props.contractTermsOriginal) {
            this.setState({
                messages: props.contractTalk.messages ? props.contractTalk.messages : [],
                originalContractTerms : props.contractTermsOriginal,
                updatedContractTerms : props.contractTalk.currentContractTerms ? props.contractTalk.currentContractTerms : CloneObject(props.contractTermsOriginal),
                templateId: props.ctiTemplateId,
                legalIds: props.contractTalk.legalIds,
                myBiz: props.myBiz,
                talkId: props.contractTalk._id,
                ctiOwnerBizId: props.contractTalk.ctiOwnerBizId,
                status: props.contractTalk.status
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setStateForProps(nextProps);
    }

    validateContractTerms(contractTermsForm){
        jQuery.validator.addMethod("greaterThan", function(value, element, params) {
            if ($(params[0]).val() != '') {
                if (!/Invalid|NaN/.test(new Date(value))) {
                    return new Date(value) > new Date($(params[0]).val());
                }
                return isNaN(value) && isNaN($(params[0]).val()) || (Number(value) > Number($(params[0]).val()));
            };
            return true;
        },'Must be greater than {1}.');
        $(contractTermsForm).validate({
            rules: {
                endDate: {
                    greaterThan: ["#startDate","Start Date"]
                }
            },

            messages: {
                endDate: {
                    greaterThan: 'End date must be greater than start date'
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

    handleNewTermsClick(contractTermsForm){

        this.validateContractTerms(contractTermsForm);
        if($(contractTermsForm).valid()){

            var myUser = {};
            myUser.name = this.state.myBiz.name;
            myUser.id = this.state.myBiz._id;

            let message = this.state.newContractTermsRequest;
            if(!message.contractTerms){
                message.contractTerms = CloneObject(this.state.updatedContractTerms);
            }
            message.accepted = undefined;
            message.sender = myUser;
            message.date = Date.now();
            message.type = 'NEW_TERMS';

            let messages = this.state.messages;

            /*let lastContractTerms = this.state.originalContractTerms;
            if(removeLastAccepted) {
                let counter = 0;
                for(var i = messages.length-1; i >= 0; i--){
                    if(messages[i].type == "NEW_TERMS"){
                        if (counter === 1) {
                            lastContractTerms = messages[i].contractTerms;
                        }
                        counter++;
                    }
                }
            }*/

            messages.push(message);

            this.setState({
                messages : messages,
                newContractTermsRequest : {}
            });

            /*if(removeLastAccepted) {
             ContractTalkApi.saveMessageNewTermsReplaceLastAccepted(message, this.state.talkId, lastContractTerms);
             this.setState({
             updatedContractTerms: lastContractTerms
             });
             }
             else
             ContractTalkApi.saveMessageNewTerms(message, this.state.talkId);
             */
            ContractTalkApi.saveMessageAcceptTerms(message, this.state.talkId, message.contractTerms, myUser.name + ' proposed new terms');
            this.setState({
                updatedContractTerms: message.contractTerms
            });

        }
    }

    handleAcceptTermsClick(){
        var myUser = {};
        myUser.name = this.state.myBiz.name;
        myUser.id = this.state.myBiz._id;

        let message = this.state.newContractTermsRequest;
        message.accepted = true;
        message.sender = myUser;
        message.date = Date.now();
        message.type = 'ACCEPTANCE';

        let messages = this.state.messages;
        let lastContractTerms = messages.length > 0 ? messages[messages.length-1].contractTerms : this.state.originalContractTerms;
        messages.push(message);
        this.setState({
            messages : messages,
            newContractTermsRequest : {}
        });

        ContractTalkApi.saveMessageAcceptTerms(message, this.state.talkId, lastContractTerms, myUser.name + ' accepted proposed terms');
        this.setState({
            updatedContractTerms: lastContractTerms
        });

    }

    handleDeclineTermsClick(){
        var myUser = {};
        myUser.name = this.state.myBiz.name;
        myUser.id = this.state.myBiz._id;

        let message = this.state.newContractTermsRequest;
        message.accepted = false;
        message.sender = myUser;
        message.date = Date.now();
        message.type = 'ACCEPTANCE';

        let messages = this.state.messages;
        messages.push(message);
        this.setState({
            messages : messages,
            newContractTermsRequest : {}
        });
        ContractTalkApi.saveMessageNewTerms(message, this.state.talkId, myUser.name + ' declined proposed terms');
    }

    handleShowAcceptance(last){
        if(last === true){
            this.setState({
                    lastMessageMode: 'NEW_TERMS'
                }
            )
        }
        else{
            this.setState({
                    firstMessageMode: 'NEW_TERMS'
                }
            )
        }
    }

    handleShowNegotiate(last){
        if(last === true){
            this.setState({
                    lastMessageMode: 'ACCEPTANCE'
                }
            )
        }
        else{
            this.setState({
                    firstMessageMode: 'ACCEPTANCE'
                }
            )
        }
    }

    handleCreateContract() {
        ContractTalkApi.saveContract(this.props.contractTalk, 'Contract concluded');
    }

    handleBackToDefaultClick(last){
        if(last === true){
            this.setState({
                    lastMessageMode: undefined
                }
            )
        }
        else{
            this.setState({
                    firstMessageMode: undefined
                }
            )
        }
    }

    onContractTermChange(e, key, datePicker) {
        let newContractTermsRequest = this.state.newContractTermsRequest;
        if(!newContractTermsRequest.contractTerms){
            newContractTermsRequest.contractTerms = CloneObject(this.state.updatedContractTerms);
        }
        newContractTermsRequest.contractTerms[key].value = datePicker ? moment(e._d).format("YYYY-MM-DD") : e.target.value;
        this.setState({
            newContractTermsRequest : newContractTermsRequest,
        });
    }

    onContractTermListChange(e, key) {
        let newContractTermsRequest = this.state.newContractTermsRequest;
        if(!newContractTermsRequest.contractTerms){
            newContractTermsRequest.contractTerms = CloneObject(this.state.updatedContractTerms);
        }
        newContractTermsRequest.contractTerms[key].value = newContractTermsRequest.contractTerms[key].values[e.target.value];
        this.setState({
            newContractTermsRequest : newContractTermsRequest,
        });
    }

    onCommentRequestUpdate(e) {
        let newContractTermsRequest = this.state.newContractTermsRequest;
        newContractTermsRequest.comment = e.target.value;
        this.setState({
            newContractTermsRequest : newContractTermsRequest,
        });
    }

    getSelectOptions(list) {
        var selectOptions = list.map((item, index) => {
            return (
                <option key={index} value={index}>{item.shortDescription}</option>
            );
        });
        return selectOptions;
    }

    getFullDescriptionAndUrl(value){
        if(!value){
            return;
        }
        if(!value.description && !value.docUrl){
            return;
        }
        return (
            <div>
                <strong>Description:</strong>{value.description};
                <br/>
                <strong>Url:</strong> <a href={value.docUrl} target="_blank">{value.docUrl}</a>
            </div>
        );
    }

    getSelectedValue(list, item){
        return list.findIndex(x => x.name==item.name);
    }

    getContractTermsInputs(){
        let object = this.state.updatedContractTerms;
        if(this.state.newContractTermsRequest && this.state.newContractTermsRequest.contractTerms){
            object = this.state.newContractTermsRequest.contractTerms;
        }
        if(object){
            var contractTerms = Object.keys(object).map(function(key) {
                if(object[key].type == "grid_check"){
                    return (
                        <div>
                            <div className="form-group col-md-12" key={key}>
                                <label className="col-md-3 control-label">{key}</label>
                                <div className="col-md-5">
                                    <select className="form-control" name={object[key].inputName} id={object[key].inputName} value={this.getSelectedValue(object[key].values, object[key].value)} onChange={(e) => this.onContractTermListChange(e, key)}>
                                        {this.getSelectOptions(object[key].values)}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group col-md-12" key={key + "description"}>
                                <label className="col-md-3 control-label"></label>
                                <div className="col-md-9">
                                    {this.getFullDescriptionAndUrl(object[key].value)}
                                </div>
                            </div>
                        </div>
                    );
                }
                else if (object[key].type === 'date' && !Modernizr.inputtypes.date){
                    return (
                        <div className="form-group col-md-12">
                            <label className="col-md-3 control-label">{key}</label>
                            <div className="col-md-5">
                                <DatePicker
                                    placeholderText="mm/dd/yyyy"
                                    selected = {object[key].value ? moment(object[key].value) : ''}
                                    onChange={(e) => this.onContractTermChange(e, key, true)}
                                    className="form-control" id={object[key].inputName} name={object[key].inputName} type={object[key].type}/>
                            </div>
                        </div>
                    );
                }
                else {
                    return (
                        <div className="form-group col-md-12" key={key}>
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

    getLastReceivedMessageType(){
        if(!this.state.messages || this.state.messages.length===0){
            var type = 'POST_FIRST_MESSAGE';
            let messageTerms = this.state.originalContractTerms;
            if(messageTerms){
                Object.keys(messageTerms).forEach(function(key) {
                    if(!messageTerms[key].value){
                        type = 'ACCEPTANCE';
                    }
                });
            }
            return type;
        }
        var messageType = undefined;

        var lastMessage = this.state.messages[this.state.messages.length-1];
        if(lastMessage.type === 'ACCEPTANCE' && lastMessage.accepted === true && lastMessage.sender.id === this.state.myBiz._id){
            return 'NO_ACTION';
        }
        if(lastMessage.type === 'ACCEPTANCE' && lastMessage.accepted === true && lastMessage.sender.id !== this.state.myBiz._id){
            return 'CONTINUE_NEGOTIATE';
        }
        if(lastMessage.type === 'ACCEPTANCE' && lastMessage.accepted === false && lastMessage.sender.id === this.state.myBiz._id){
            return 'ACCEPTANCE';
        }


        for(var i = this.state.messages.length - 1; i >= 0; i--){
            if(this.state.messages[i].sender.id != this.state.myBiz._id){
                messageType = this.state.messages[i].type;
                if(messageType === 'NEW_TERMS'){
                    let messageTerms = this.state.messages[i].contractTerms;
                    if(messageTerms){
                        Object.keys(messageTerms).forEach(function(key) {
                            if(!messageTerms[key].value){
                                messageType = 'ACCEPTANCE';
                            }
                        });
                    }
                }
                break;
            }
        }
        if(!messageType){
            messageType = this.state.messages[this.state.messages.length-1].type === 'ACCEPTANCE' ? 'NEW_TERMS' : 'ACCEPTANCE';
        }
        return messageType;
    }

    getTemplateText(templateId, legalIds, contractTerms){
        if(!templateId){
            return;
        }
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

    showCommentPageFooter(){
        var messageType = this.getLastReceivedMessageType();
        return this.renderCommentBox(messageType);
    }

    renderCommentBox(messageType){
        if(messageType && messageType === 'ACCEPTANCE')
        {
            return(
                <div>
                    <div className="chat-footer">
                        <div className="textarea-div">
                            <div className="typeareaL">
                                <form noValidate="novalidate" ref={ form => (this.commentBoxForm = form) }>
                                    <fieldset>
                                        <br/>
                                        {this.getContractTermsInputs()}
                                    </fieldset>
                                </form>
                            </div>
                            <div className="typearea">
                                <textarea placeholder="Add message content..." className="custom-scroll" onChange={(e) => this.onCommentRequestUpdate(e)}></textarea>
                            </div>

                        </div>

                        <div className="textarea-controls">
                            <button className="btn btn-sm btn-primary pull-right button-group" onClick={() => this.handleNewTermsClick(this.commentBoxForm)}>Request Contract Terms Update</button>
                        </div>

                    </div>

                    <div className="col-md-12">
                        Updated Template
                        <br/>
                        <div className="well">
                            {this.getTemplateText(this.state.templateId, this.state.legalIds, this.state.updatedContractTerms)}
                        </div>
                    </div>

                </div>
            )
        }
        else if(messageType && messageType === 'NEW_TERMS'){
            return(
                <div>
                    <div className="chat-footer">
                        <div className="textarea-div">
                            <div className="typearea">
                                <textarea placeholder="Write message content..." className="custom-scroll" onChange={(e) => this.onCommentRequestUpdate(e)}></textarea>
                            </div>
                        </div>
                        <div className="textarea-controls">
                            <div className="textarea-controls">
                                <button className="btn btn-sm btn-primary pull-right button-group" onClick={() => this.handleAcceptTermsClick()}>Accept</button>
                                <button className="btn btn-sm btn-primary pull-right button-group" onClick={() => this.handleDeclineTermsClick()}>Decline</button>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-12">
                        Updated Template
                        <br/>
                        <div className="well">
                            {this.getTemplateText(this.state.templateId, this.state.legalIds, this.state.updatedContractTerms)}
                        </div>
                    </div>

                </div>
            )
        }
        else if (messageType && messageType === 'POST_FIRST_MESSAGE') {
            return (
                <div className="form-group cursor-all-scroll">
                    { this.renderFirstDefaultBox(this.state.firstMessageMode)}
                    { this.renderFirstMessageBox(this.state.firstMessageMode)}

                    <div className="col-md-12">
                        Updated Template
                        <br/>
                        <div className="well">
                            {this.getTemplateText(this.state.templateId, this.state.legalIds, this.state.originalContractTerms)}
                        </div>
                    </div>

                </div>
            );
        }
        else if(messageType && messageType === 'CONTINUE_NEGOTIATE'){
            return (
                <div className="form-group cursor-all-scroll">

                    <div className="form-group">
                        { this.renderLastDefaultBox(this.state.lastMessageMode)}
                        { this.renderLastMessageBox(this.state.lastMessageMode)}
                    </div>

                    <div className="col-md-12">
                        Updated Template
                        <br/>
                        <div className="well">
                            {this.getTemplateText(this.state.templateId, this.state.legalIds, this.state.updatedContractTerms)}
                        </div>
                    </div>

                </div>
            )
        }
        else{
            return(
                <div>
                    <div className="col-md-12">
                        Updated Template
                        <br/>
                        <div className="well">
                            {this.getTemplateText(this.state.templateId, this.state.legalIds, this.state.updatedContractTerms)}
                        </div>
                    </div>

                </div>
            )
        }
    }

    renderFirstDefaultBox(messageType){
        if(!messageType){
            return(
                <div>
                    <div className="col-md-5">
                        <button className="btn btn-sm btn-primary pull-right button-group btn-block" onClick={() => this.handleShowAcceptance(false)}>Accept Terms</button>
                    </div>
                    <div className="col-md-2">
                        <label className="text-align-center"></label>
                    </div>
                    <div className="col-md-5">
                        <button className="btn btn-sm btn-primary pull-right button-group btn-block" onClick={() => this.handleShowNegotiate(false)}>Negotiate</button>
                    </div>
                </div>
            );
        }
    }

    renderFirstMessageBox(messageType){
        if(messageType && messageType === 'ACCEPTANCE')
        {
            return(
                <div className="chat-footer">
                    <div className="textarea-div">
                        <div className="typeareaL">
                            <a className="pull-right" onClick={this.handleBackToDefaultClick}><i className="icon-prepend fa fa-times"/></a>
                            <form noValidate="novalidate" ref={ form => (this.firstMessageBoxForm = form) }>
                                <fieldset>
                                    <br/>
                                    {this.getContractTermsInputs()}
                                </fieldset>
                            </form>
                        </div>
                        <div className="typearea">
                            <textarea placeholder="Add message content..." className="custom-scroll" onChange={(e) => this.onCommentRequestUpdate(e)}></textarea>
                        </div>

                    </div>

                    <div className="textarea-controls">
                        <button className="btn btn-sm btn-primary pull-right button-group" onClick={() => this.handleNewTermsClick(this.firstMessageBoxForm)}>Request Contact Terms Update</button>
                    </div>

                </div>
            )
        }
        else if(messageType && messageType === 'NEW_TERMS'){
            return(
                <div className="chat-footer">
                    <div className="textarea-div">
                        <div className="typearea">
                            <a className="pull-right" onClick={this.handleBackToDefaultClick}><i className="icon-prepend fa fa-times"/></a>
                            <textarea placeholder="Write message content..." className="custom-scroll" onChange={(e) => this.onCommentRequestUpdate(e)}></textarea>
                        </div>
                    </div>
                    <div className="textarea-controls">
                        <div className="textarea-controls">
                            <button className="btn btn-sm btn-primary pull-right button-group" onClick={() => this.handleAcceptTermsClick()}>Accept</button>
                        </div>
                    </div>

                </div>
            )
        }

    }

    renderLastDefaultBox(messageType){
        if(!messageType){
            return(
                <div>
                    {
                        (this.state.status != 'Contract concluded') ?
                            <div>
                                <div className="col-md-5">
                                    <button className="btn btn-sm btn-primary pull-right button-group btn-block"
                                            onClick={() => this.handleCreateContract()}>
                                        Accept Terms and Create Contract
                                    </button>
                                </div>
                                <div className="col-md-2">
                                    <label className="text-align-center"></label>
                                </div>
                                <div className="col-md-5">
                                    <button className="btn btn-sm btn-primary pull-right button-group btn-block" onClick={() => this.handleShowNegotiate(true)}>Continue Negotiations</button>
                                </div>
                            </div> :
                            <div></div>
                    }
                </div>
            );
        }
    }

    renderLastMessageBox(messageType){
        if(messageType && messageType === 'ACCEPTANCE')
        {
            return(
                <div className="chat-footer">
                    <div className="textarea-div">
                        <div className="typeareaL">
                            <a className="pull-right" onClick={this.handleBackToDefaultClick}><i className="icon-prepend fa fa-times"/></a>
                            <form noValidate="novalidate" ref={ form => (this.lastMessageBoxForm = form) }>
                                <fieldset>
                                    <br/>
                                    {this.getContractTermsInputs()}
                                </fieldset>
                            </form>
                        </div>
                        <div className="typearea">
                            <textarea placeholder="Add message content..." className="custom-scroll" onChange={(e) => this.onCommentRequestUpdate(e)}></textarea>
                        </div>

                    </div>

                    <div className="textarea-controls">
                        <span>Last accepted terms will be declined</span>
                        <button className="btn btn-sm btn-primary pull-right button-group" onClick={() => this.handleNewTermsClick(this.lastMessageBoxForm)}>Request Contact Terms Update</button>
                    </div>

                </div>
            )
        }

    }

    render() {

        return (

            <div>
                <header id="header" className="animated fadeInDown">
                    <div id="logo-group"></div>
                    <span id="extr-page-header-space">
                        Contract Talk Message Preview
                    </span>
                </header>

                <div className="chat-body custom-scroll">
                    <MessageContent messages={this.state.messages}></MessageContent>
                </div>

                {this.showCommentPageFooter()}




            </div>
        );
    }
}

ContractTalk.propTypes = {
    contractTalk: PropTypes.object,
    contractTermsOriginal: PropTypes.object,
    ctiTemplateId: PropTypes.string,
    myBiz: PropTypes.object,
};

export default createContainer(({params}) => {

    const subscriptionContractTalks = Meteor.subscribe('contractTalks');
    const loadingContractTalks =  !subscriptionContractTalks.ready();
    const contractTalk = ContractTalks.findOne({_id: params.talkId});
    const contractTalkExist = !loadingContractTalks && !!contractTalk;

    const subscriptionContractInvites = Meteor.subscribe('contractInvites');
    const loadingContractInvites =  !subscriptionContractInvites.ready();

    let contractInvite = {};
    let contractInviteExist = false;

    if(contractTalk) {
        contractInvite = ContractInvites.findOne({_id: contractTalk.contractInviteId}, { fields: {contractTerms: 1, templateId: 1, bizId: 1}});
        contractInviteExist = !loadingContractInvites && !!contractInvite;
    }

    const subscriptionBizes = Meteor.subscribe('bizes');
    const loadingBizes = !subscriptionBizes.ready();
    const talkBizes = Bizes.find({$or: [{_id: params.id}, {_id: contractInvite.bizId}]}, {fields: {name:1}}).fetch();
    const bizesExist = !loadingBizes && !!talkBizes;
    let myBiz = {};

    if(bizesExist) {
        talkBizes.map((biz) => {
            if(biz._id === params.id)
                myBiz = biz;
        });
    }

    return {
        contractTalk: contractTalkExist ? contractTalk : {},
        contractTermsOriginal: contractInviteExist ? contractInvite.contractTerms : {},
        ctiTemplateId: contractInviteExist ? contractInvite.templateId : "",
        myBiz: myBiz,
    };

}, ContractTalk);