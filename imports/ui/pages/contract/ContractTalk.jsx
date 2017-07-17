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
                        return (
                            <div className="row" key={key}>
                                <div className="col-lg-3">{key}:</div>
                                <div className="col-lg-6">{object[key].value}</div>
                            </div>
                        );
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
            ctiOwnerBizId: undefined
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
                ctiOwnerBizId: props.contractTalk.ctiOwnerBizId
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setStateForProps(nextProps);
    }

    handleNewTermsClick(){
        var myUser = {};
        myUser.name = this.state.myBiz.name;
        myUser.id = this.state.myBiz._id;

        let message = this.state.newContractTermsRequest;
        message.accepted = undefined;
        message.sender = myUser;
        message.date = Date.now();
        message.type = 'NEW_TERMS';

        let messages = this.state.messages;
        messages.push(message);
        this.setState({
            messages : messages,
            newContractTermsRequest : {}
        });
        ContractTalkApi.saveMessageNewTerms(message, this.state.talkId);
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

        ContractTalkApi.saveMessageAcceptTerms(message, this.state.talkId, lastContractTerms);
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
        ContractTalkApi.saveMessageNewTerms(message, this.state.talkId);
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
        ContractTalkApi.saveContract(this.props.contractTalk);
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

    onContractTermChange(e, key) {
        let newContractTermsRequest = this.state.newContractTermsRequest;
        if(!newContractTermsRequest.contractTerms){
            newContractTermsRequest.contractTerms = CloneObject(this.state.updatedContractTerms);
        }
        newContractTermsRequest.contractTerms[key].value = e.target.value;
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

    getContractTermsInputs(){
        let object = this.state.updatedContractTerms;
        if(this.state.newContractTermsRequest && this.state.newContractTermsRequest.contractTerms){
            object = this.state.newContractTermsRequest.contractTerms;
        }
        if(object){
            var contractTerms = Object.keys(object).map(function(key) {
                return (
                    <div className="form-group col-md-12" key={key}>
                        <label className="col-md-3 control-label">{key}</label>
                        <div className="col-md-5">
                            <input className="form-control" id={object[key].inputName} name={object[key].inputName} type={object[key].type} value={object[key].value} placeholder={key} onChange={(e) => this.onContractTermChange(e, key)}/>
                        </div>
                    </div>
                );
            }.bind(this));
            return contractTerms;
        }
    }

    getLastReceivedMessageType(){
        if(!this.state.messages || this.state.messages.length===0){
            return 'POST_FIRST_MESSAGE';
        }
        var messageType = undefined;

        var lastMessage = this.state.messages[this.state.messages.length-1];
        if(lastMessage.type === 'ACCEPTANCE' && lastMessage.accepted === true && lastMessage.sender.id === this.state.myBiz._id){
            return 'NO_ACTION';
        }
        if(lastMessage.type === 'ACCEPTANCE' && lastMessage.accepted === true && lastMessage.sender.id !== this.state.myBiz._id){
            return 'CONTINUE_NEGOTIATE';
        }

        for(var i = this.state.messages.length - 1; i >= 0; i--){
            if(this.state.messages[i].sender.id != this.state.myBiz._id){
                messageType = this.state.messages[i].type;
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
                                <fieldset>
                                    <br/>
                                    {this.getContractTermsInputs()}
                                </fieldset>
                            </div>
                            <div className="typearea">
                                <textarea placeholder="Add message content..." className="custom-scroll" onChange={(e) => this.onCommentRequestUpdate(e)}></textarea>
                            </div>

                        </div>

                        <div className="textarea-controls">
                            <button className="btn btn-sm btn-primary pull-right button-group" onClick={() => this.handleNewTermsClick()}>Request Contact Terms Update</button>
                        </div>

                    </div>

                    <div className="col-md-6">
                        Original Template
                        <br/>
                        <div className="well">
                            {this.getTemplateText(this.state.templateId, this.state.legalIds, this.state.originalContractTerms)}
                        </div>
                    </div>
                    <div className="col-md-6">
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

                    <div className="col-md-6">
                        Original Template
                        <br/>
                        <div className="well">
                            {this.getTemplateText(this.state.templateId, this.state.legalIds, this.state.originalContractTerms)}
                        </div>
                    </div>
                    <div className="col-md-6">
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

                    <div className="col-md-6">
                        Original Template
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

                    <div className="col-md-6">
                        Original Template
                        <br/>
                        <div className="well">
                            {this.getTemplateText(this.state.templateId, this.state.legalIds, this.state.originalContractTerms)}
                        </div>
                    </div>
                    <div className="col-md-6">
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
                    <div className="col-md-6">
                        Original Template
                        <br/>
                        <div className="well">
                            {this.getTemplateText(this.state.templateId, this.state.legalIds, this.state.originalContractTerms)}
                        </div>
                    </div>
                    <div className="col-md-6">
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
                            <fieldset>
                                <br/>
                                {this.getContractTermsInputs()}
                            </fieldset>
                        </div>
                        <div className="typearea">
                            <textarea placeholder="Add message content..." className="custom-scroll" onChange={(e) => this.onCommentRequestUpdate(e)}></textarea>
                        </div>

                    </div>

                    <div className="textarea-controls">
                        <button className="btn btn-sm btn-primary pull-right button-group" onClick={() => this.handleNewTermsClick()}>Request Contact Terms Update</button>
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
                    <div className="col-md-5">
                        {
                            (this.state.myBiz._id === this.state.ctiOwnerBizId) ?
                                <button className="btn btn-sm btn-primary pull-right button-group btn-block"
                                        onClick={() => this.handleCreateContract()}>
                                    Accept Terms and Create Contract
                                </button> :
                                <button className="btn btn-sm btn-primary pull-right button-group btn-block">
                                    Accept Terms
                                </button>
                        }
                    </div>
                    <div className="col-md-2">
                        <label className="text-align-center"></label>
                    </div>
                    <div className="col-md-5">
                        <button className="btn btn-sm btn-primary pull-right button-group btn-block" onClick={() => this.handleShowNegotiate(true)}>Continue Negotiations</button>
                    </div>
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
                            <fieldset>
                                <br/>
                                {this.getContractTermsInputs()}
                            </fieldset>
                        </div>
                        <div className="typearea">
                            <textarea placeholder="Add message content..." className="custom-scroll" onChange={(e) => this.onCommentRequestUpdate(e)}></textarea>
                        </div>

                    </div>

                    <div className="textarea-controls">
                        {//TODO:: add information that last accepted will be declined, + add onClick
                        }
                        <button className="btn btn-sm btn-primary pull-right button-group">Request Contact Terms Update</button>
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