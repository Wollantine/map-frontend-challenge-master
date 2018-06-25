import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { JobFormView } from '../JobFormView';
import { EFieldStatus } from '../redux/field';
import { JobField } from '../JobField/JobField';
import { CreateJobButton } from '../CreateJobButton/CreateJobButton';


describe('<JobFormView/>', () => {
    const noOp = () => {};
    const emptyField = { value: '', status: EFieldStatus.pristine, onChange: noOp, onBlur: noOp};

    it('should render two JobFields', () => {
        const wrapper = shallow(
            <JobFormView
                pickupInput={emptyField}
                dropoffInput={emptyField}
            />
        );
        expect(wrapper).to.have.exactly(2).descendants(JobField);
    });

    it('should render a CreateJobButton', () => {
        const wrapper = shallow(
            <JobFormView
                pickupInput={emptyField}
                dropoffInput={emptyField}
            />
        );
        expect(wrapper).to.have.exactly(1).descendants(CreateJobButton);
    });
});
