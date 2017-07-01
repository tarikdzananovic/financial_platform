import React, { Component } from 'react';

export default class BizCabinet extends Component {

    constructor(props) {
        super(props);

        this.state = {
            biz: {},
            editLocation : window.location.hash.replace('cabinet', 'edit'),
            ctiLocation: window.location.hash.replace('cabinet', 'contractInvite')
        };
    }

    render() {
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
}