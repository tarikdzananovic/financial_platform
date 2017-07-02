import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import { Meteor} from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bizes } from '../../../api/bizes.js';

class BizCabinet extends Component {

    constructor(props) {
        super(props);

        this.state = {
            biz: {},
            editLocation : window.location.hash.replace('cabinet', 'edit'),
            ctiLocation: window.location.hash.replace('cabinet', 'contractInvite'),
            publicCabinet : false
        };
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.setState({
            biz: nextProps.biz,
            publicCabinet : nextProps.biz.userId !== Meteor.user()._id,
        });

    }

    render() {
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
                </div>
            )
        }
        else {
            return(
                <div></div>
            );
        }

    }
}

BizCabinet.propTypes = {
    biz: PropTypes.object,
};

export default createContainer(({params}) => {

    const subscription = Meteor.subscribe('bizes');
    const loading =  !subscription.ready();
    const biz = Bizes.findOne({_id: params.id}, {fields: { name: 1, userId: 1 }});
    const bizExists = !loading && !!biz;
    return {
        biz: bizExists ? biz : {},
    };

}, BizCabinet);