import React, { Component } from 'react';

import { createContainer } from 'meteor/react-meteor-data';
import Wizard from '../../components/forms/wizards/Wizard';

class ContractTemplate extends Component {
    render() {
        return (
            <div>

                <div className="row">
                    <section className="col-sm-6">
                        Template Info:
                    </section>
                </div>
                <br/>

                <div className="row">
                    <section  className="col-sm-6">
                        <label> Legal IDs used in Contract: </label>
                        <li>
                                    <span className="text">
                                        Donor ID
                                    </span>
                        </li>
                        <li>
                                    <span className="text">
                                        Advertising Company ID
                                    </span>
                        </li>
                    </section>
                    <section  className="col-sm-6">
                        <label> Terms in Contract: </label>
                        <li>
                                    <span className="text">
                                        Agent Service Type
                                    </span>
                        </li>
                        <li>
                                    <span className="text">
                                        Start Date
                                    </span>
                        </li>
                        <li>
                                    <span className="text">
                                        End Date
                                    </span>
                        </li>
                        <li>
                                    <span className="text">
                                        Compensation Amount
                                    </span>
                        </li>
                    </section>
                </div>
            </div>
        );
    }
}

export default class ContractInvite extends Component {

    constructor(props) {
        super(props);

        this.state = {
            templateVisible: false,
            currentStep : 1,
            btnNextText : 'Next'
        };

        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
    }

    handleNextClick(){
        //TODO:: validate current step (having step index = currentStep), then call this.linkNext.click() to go to the next step
        this.linkNext.click();
    }
    handlePreviousClick(){
        this.linkPrevious.click();
    }

    onTemplateSelected() {
        this.setState({
            templateVisible: !this.state.templateVisible
        });
    }

    _onWizardComplete(data){
    }

    _onStepChange(data){
        this.setState({ currentStep: data.step, btnNextText: data.isLast ? 'Completed' : 'Next'});
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

                    <form noValidate="novalidate">
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
                                    <br/>
                                    <br/>

                                    <h4><strong>Step 1 </strong> - Choose template</h4>

                                    <br/>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <select name="template" defaultValue={"0"} onChange={() => this.onTemplateSelected()}>
                                                        <option value="0" disabled={true}>Contract Template</option>
                                                        <option value="2">Advertising Template</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.state.templateVisible ? <ContractTemplate /> : null
                                    }
                                </div>


                                <div className="tab-pane" data-smart-wizard-pane="2">
                                    <br/>

                                    <h4><strong>Step 2 </strong> - Enter CTI Information</h4>

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
                    </form>

                </div>

            </div>


            /*<form id="checkout-form" className="smart-form" noValidate="novalidate"
                  onSubmit={this._onSubmit}
                  ref={ form => (this.form = form) }
            >

                <header id="header" className="animated fadeInDown">
                    <div id="logo-group"></div>
                    <span id="extr-page-header-space">
                        Contract invite creation
                    </span>
                </header>

                <fieldset>
                    <div className="row">
                        <section className="col col-6">
                            <label className="select">
                                <select name="template" defaultValue={"0"} onChange={() => this.onTemplateSelected()}>
                                    <option value="0" disabled={true}>Contract Template</option>
                                    <option value="2">Advertising Template</option>
                                </select> <i/> </label>
                        </section>
                    </div>

                    {
                        this.state.templateVisible ? <ContractTemplate /> : null
                    }
                </fieldset>

                <footer>
                    <button type="submit" className="btn btn-primary">
                        Next
                    </button>
                </footer>

            </form>*/

        );
    }

}


