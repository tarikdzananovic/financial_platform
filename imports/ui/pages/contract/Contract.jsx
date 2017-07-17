import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types'
import { Meteor } from 'meteor/meteor';

import { Contracts } from '../../../api/contracts/contracts.js'
import getTemplateText from '../../../modules/contract/cti/TemplateText'

class Contract extends Component {

    constructor(props){
        super(props);

        this.state = {
            templateId: undefined,
            legalIds: [],
            contractTerms: {}
        };

        this.setStateForProps = this.setStateForProps.bind(this);
    }

    componentDidMount() {
        this.setStateForProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setStateForProps(nextProps);
    }

    setStateForProps(props) {
        if(props.contract) {
            this.setState({
                templateId: props.contract.contractInvite.templateId,
                legalIds: props.contract.legalIds,
                contractTerms: props.contract.contractTerms
            });
        }
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

    render() {
        return(
            <div className="well">
                {this.getTemplateText(this.state.templateId, this.state.legalIds, this.state.contractTerms)}
            </div>

        );
    }
}

Contract.propTypes = {
    contract: PropTypes.object,
}

export default createContainer(({params}) => {

    const subscription = Meteor.subscribe('contracts');
    const loading =  !subscription.ready();
    const contract = Contracts.findOne({_id : params.contractId});
    const contractExists = !loading && contract;

    return {
        contract: contractExists ? contract : {},
    };
}, Contract);

