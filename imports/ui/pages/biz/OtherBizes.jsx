import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer} from 'meteor/react-meteor-data';

import { Bizes } from '../../../api/bizes.js';

class BizPreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bizCabinet: window.location.hash.replace('otherBizes',
                props.biz._id),
        };
    }

    render() {
        return (
            <li>
                <a href={this.state.bizCabinet} className="btn bg-color-blueLight txt-color-white">
                    <i className="fa fa-5x fa-hand-o-right "></i>
                    {this.props.biz.name}
                </a>


            </li>
        );
    }
}

class OtherBizes extends Component {

    componentWillReceiveProps(nextProps, nextState) {
        nextProps.otherBizes.map((otherBiz) => {
            console.log("Other biz: " + JSON.stringify(otherBiz));
        });
    }

    renderOtherBizes() {
        let otherBizes = this.props.otherBizes;

        return otherBizes.map((otherBiz) => {
            return (
                <BizPreview
                    key={otherBiz._id}
                    biz={otherBiz}
                />
            );
        });
    }

    render() {
        return (
            <div>

                <header id="header" className="animated fadeInDown">
                    <div id="logo-group"></div>
                    <span id="extr-page-header-space">
                            BIZES IN SYSTEM
                        </span>
                </header>

                <div className="well">
                    <ul className="demo-btns">
                        {this.renderOtherBizes()}
                    </ul>
                </div>

            </div>




        );
    }
};

OtherBizes.propTypes = {
    otherBizes: PropTypes.array,
};

export default createContainer(() => {

    const subscription = Meteor.subscribe('bizes');
    const loading = !subscription.ready();
    const otherBizes = Bizes.find({userId: {$ne: Meteor.userId()}}, { fields: { name: 1, email: 1} }).fetch();
    const otherBizesExist = !loading && !!otherBizes;
    return {
        otherBizes: otherBizesExist ? otherBizes : [],
    };

}, OtherBizes);

