import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { JobFormView } from '../JobFormView';
import { EFieldStatus } from '../redux/field';
import { JobField } from '../JobField/JobField';


describe('<JobFormView/>', () => {
    const emptyField = { value: '', status: EFieldStatus.pristine, onChange: () => {} };

    it('should render two JobFields', () => {
        const wrapper = shallow(
            <JobFormView
                pickupInput={emptyField}
                dropoffInput={emptyField}
                isButtonDisabled={true}
                isButtonCreating={false}
            />
        );
        expect(wrapper).to.have.exactly(2).descendants(JobField);
    });

    it('should render a disabled button when isButtonDisabled', () => {
        const wrapper = shallow(
            <JobFormView
                pickupInput={emptyField}
                dropoffInput={emptyField}
                isButtonDisabled={true}
                isButtonCreating={false}
            />
        );
        expect(wrapper.find('button')).to.have.attr('disabled');
    });

    it('should render an enabled button when not isButtonDisabled', () => {
        const wrapper = shallow(
            <JobFormView
                pickupInput={emptyField}
                dropoffInput={emptyField}
                isButtonDisabled={false}
                isButtonCreating={false}
            />
        );
        expect(wrapper.find('button')).to.not.have.attr('disabled');
    });

    it('should show "Creating..." at the button when isButtonCreating', () => {
        const wrapper = shallow(
            <JobFormView
                pickupInput={emptyField}
                dropoffInput={emptyField}
                isButtonDisabled={true}
                isButtonCreating={true}
            />
        );
        expect(wrapper.find('button')).to.have.text('Creating...');
    });

    it('should show "Create Job" at the button when not isButtonCreating', () => {
        const wrapper = shallow(
            <JobFormView
                pickupInput={emptyField}
                dropoffInput={emptyField}
                isButtonDisabled={true}
                isButtonCreating={false}
            />
        );
        expect(wrapper.find('button')).to.have.text('Create Job');
    });
});
