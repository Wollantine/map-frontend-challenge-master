import * as React from 'react';
import {expect} from 'chai';
import {render} from 'enzyme';
import JobFormView, {EFieldStatus} from '../JobFormView';

describe('<JobFormView/>', () => {
    const emptyField = {value: '', status: EFieldStatus.pristine, onChange: () => {}};

    it('should render two input fields', () => {
        const wrapper = render(
            <JobFormView
                pickupInput={emptyField}
                dropoffInput={emptyField}
            />
        );
        expect(wrapper.find('input')).to.have.length(2);
    });

    it('should render a disabled button by default', () => {
        const wrapper = render(
            <JobFormView
                pickupInput={emptyField}
                dropoffInput={emptyField}
            />
        );
        expect(wrapper.find('button').is('[disabled]')).to.be.true;
    });

    it('should render an enabled button when both inputs are right', () => {
        
    });

    it('should render a grey icon if the input is pristine', () => {
        
    });

    it('should render a red icon if the input has error', () => {
        
    });

    it('should render a green icon if the input is a success', () => {
        
    });
});
