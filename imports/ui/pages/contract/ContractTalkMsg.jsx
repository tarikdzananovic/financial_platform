import React, { Component } from 'react';
import Moment from '../../components/utils/Moment'

class Message extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
        <div>
            <div className="message-text">
                <time>
                    <Moment date={this.props.msg.date} />
                </time>
                <p className="username">{this.props.msg.sender.name}</p>
                {this.props.msg.comment}
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
            messages : this.getDefaultNewTermsMessages()
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
    }

    getDefaultNewTermsMessages() {
        var msgs = [];
        var msg1 = {};
        msg1._id = 0;
        msg1.type = 'NEW_TERMS';
        msg1.comment = 'I\'m interested but could we negotiate about the amount.';
        msg1.accepted = undefined;

        var userA = {};
        var userB = {};
        userA.name = 'Lejla';
        userB.name = 'Tarik';

        msg1.sender = userA;
        msg1.received = userB;

        msg1.date = Date.now();

        msgs.push(msg1);
        var msgs2 = this.getRandomMsgs(30);
        for(var i = 0 ; i< msgs2.length; i++){
            msgs.push(msgs2[i]);
        }
        return msgs;
    }

    getDefaultAccepteTermsMessages() {
        var msgs = [];
        var msg1 = {};

        msg1._id = 10
        msg1.type = 'ACCEPTANCE';
        msg1.comment = 'It seems all good to me';
        msg1.accepted = true;

        var userA = {};
        var userB = {};
        userA.name = 'Lejla';
        userB.name = 'Tarik';

        msg1.sender = userA;
        msg1.received = userB;

        msg1.date = Date.now();

        msgs.push(msg1);
        return msgs;
    }
    
    getRandomMsgs = function (size) {
        var msgs = [];
        for(var i = 0; i< size; i++){
            var msg1 = {};
            msg1._id = i+10;
            msg1.type = 'NEW_TERMS';
            msg1.comment = 'I\'m interested but could we negotiate about the amount.';
            msg1.accepted = undefined;

            var userA = {};
            var userB = {};
            userA.name = 'Lejla';
            userB.name = 'Tarik';

            msg1.sender = userA;
            msg1.received = userB;

            msg1.date = Date.now();

            msgs.push(msg1);
        }
        return msgs;
    };


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



            </div>
        );
    }
}