import React, { Component } from 'react';
import Moment from '../../components/utils/Moment'

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
                <p className="username">{this.props.msg.sender.name} posted:</p>
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

export default class ContractTalkMsg extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //TODO: get messages from API
            messages : this.getDefaultAccepteTermsMessages(),
            newContractTermsRequest : {},
            originalContractTerms : this.getDefaultContractTerms(),
            updatedContractTerms : this.getDefaultContractTerms()
        };

        this.handleNewTermsClick = this.handleNewTermsClick.bind(this);
    }

    handleNewTermsClick(){
        //TODO: update the message with my User Id and Name
        var myUser = {};
        myUser.name = 'Tarik';
        myUser.id = undefined;

        let message = this.state.newContractTermsRequest;
        message.accepted = undefined;
        message.sender = myUser;
        message.date = Date.now();
        message.type = 'NEW_TERMS';

        let messages = this.state.messages;
        messages.push(message);
        this.setState({
            messages : messages,
            newContractTermsRequest : {} //TODO:: get Contract Terms for last approved one
        });
    }

    onContractTermChange(e, key) {
        let newContractTermsRequest = this.state.newContractTermsRequest;
        if(!newContractTermsRequest.contractTerms){
            newContractTermsRequest.contractTerms = this.state.updatedContractTerms;
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

    getObjectType = function(type, inputName, value){
        //TODO:: delete this function - just for testing purposes
        var object = {};
        object.type= type;
        object.inputName = inputName;
        object.value = value;
        return object;
    };

    getDefaultContractTerms(){
        var contractTerms = {};
        contractTerms["Agent Service Type"] = this.getObjectType("text", "agentServiceType", "Something");
        contractTerms["Start Date"] = this.getObjectType("date", "startDate");
        contractTerms["End Date"] = this.getObjectType("date", "endDate");
        contractTerms["Compensation Amount"] = this.getObjectType("number", "amount", 3200);
        return contractTerms;
    }

    getDefaultAccepteTermsMessages() {
        //TODO:: delete this function - just for testing purposes
        var msgs = [];

        var msg1 = {};
        msg1._id = 0;
        msg1.type = 'NEW_TERMS';
        msg1.comment = 'I\'m interested but could we negotiate about the amount. \ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
        msg1.accepted = undefined;

        msg1.contractTerms = this.getDefaultContractTerms();

        var userA = {};
        var userB = {};
        userA.name = 'Tarik';
        userB.name = 'Lejla';

        msg1.sender = userA;
        msg1.received = userB;

        msg1.date = Date.now();

        var msg2 = {};

        msg2._id = 10;
        msg2.type = 'ACCEPTANCE';
        msg2.comment = 'It seems all good to me';
        msg2.accepted = true;

        msg2.contractTerms = this.getDefaultContractTerms();

        var userA = {};
        var userB = {};
        userA.name = 'Lejla';
        userB.name = 'Tarik';

        msg2.sender = userA;
        msg2.received = userB;

        msg2.date = Date.now();

        msgs.push(msg1);
        msgs.push(msg2);
        return msgs;
    }



    getContractTermsInputs(){
        if(!this.state.messages || this.state.messages.length === 0) {
            return;
        }
        let object = this.state.updatedContractTerms;
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
            return;
        }
        var messageType = undefined;
        for(var i = this.state.messages.length - 1; i > 0; i--){
            //TODO get my user ID
            if(this.state.messages[i].sender.id != 0){
                messageType = this.state.messages[i].type;
                break;
            }
        }
        return messageType;
    }


    showCommentPageFooter(){
        if(!this.state.messages || this.state.messages.length===0){
            return;
        }
        var messageType = this.getLastReceivedMessageType();
        if(messageType && messageType === 'ACCEPTANCE')
        {
            return(
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
            )
        }
        else if(messageType && messageType === 'NEW_TERMS'){
            return(
                <div className="chat-footer">
                    <div className="textarea-div">
                        <div className="typearea">
                            <textarea placeholder="Write message content..." className="custom-scroll"></textarea>
                        </div>
                    </div>
                    <div className="textarea-controls">
                        <div className="textarea-controls">
                            <button className="btn btn-sm btn-primary pull-right button-group">Accept</button>
                            <button className="btn btn-sm btn-primary pull-right button-group">Decline</button>
                        </div>
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