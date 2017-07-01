import React from 'react'
import {findDOMNode} from 'react-dom'

let Wizard = React.createClass({
    componentDidMount: function(){
        let self = this;
        let element = $(findDOMNode(self));
        var stepsCount = $('[data-smart-wizard-tab]').length;

        var currentStep = 1;

        var validSteps = [];

        var $form = element.closest('form');

        var $prev = $('[data-smart-wizard-prev]', element);

        var $next = $('[data-smart-wizard-next]', element);


        var $prev2 = $('[data-smart-wizard-prev2]', element);

        var $next2 = $('[data-smart-wizard-next2]', element);

        function setStep(step) {
            currentStep = step;
            $('[data-smart-wizard-pane=' + step + ']', element).addClass('active').siblings('[data-smart-wizard-pane]').removeClass('active');
            $('[data-smart-wizard-tab=' + step + ']', element).addClass('active').siblings('[data-smart-wizard-tab]').removeClass('active');

            $prev.toggleClass('disabled', step == 1)
            $prev2.toggleClass('disabled', step == 1)
            if( _.isFunction(self.props.onStepChange)){
                var data = {};
                data.step = step;
                data.isLast = step == stepsCount;
                self.props.onStepChange(data);
            }
        }

        $next.on('click', function (e) {
            if (currentStep < stepsCount) {
                setStep(currentStep + 1);
            } else {
                var data = {};
                _.each($form.serializeArray(), function(field){
                    data[field.name] = field.value
                });
                if( _.isFunction(self.props.onComplete)){
                    self.props.onComplete(data)
                }
            }
            e.preventDefault();
        });

        $prev.on('click', function (e) {
            if (!$prev.hasClass('disabled') && currentStep > 0) {
                setStep(currentStep - 1);
            }
            e.preventDefault();
        });


        setStep(currentStep);
    },
    render: function () {
        let {children, ...props} = this.props;
        return (
            <div {...props}>
                {children}
            </div>
        )
    }
});

export default Wizard