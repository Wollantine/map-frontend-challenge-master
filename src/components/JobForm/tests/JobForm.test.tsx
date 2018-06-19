import * as React from 'react';
import {expect} from 'chai';
import {render} from 'enzyme';
import {JobFormLogic} from '../JobForm';
import { EFieldStatus } from '../redux/jobFormState';

describe('<JobForm/>', () => {
    const noOp = () => {};
    const emptyField = { value: '', status: EFieldStatus.pristine };
    const validField = { value: '', status: EFieldStatus.valid };
    const invalidField = { value: '', status: EFieldStatus.invalid };

    it('should render two input fields', () => {
        const wrapper = render(
            <JobFormLogic
                pickupInput={emptyField}
                dropoffInput={emptyField}
                onPickupChange={noOp}
                onDropoffChange={noOp}
            />
        );
        expect(wrapper).to.have.exactly(2).descendants('input');
    });

    it('should render a disabled button by default', () => {
        const wrapper = render(
            <JobFormLogic
                pickupInput={emptyField}
                dropoffInput={emptyField}
                onPickupChange={noOp}
                onDropoffChange={noOp}
            />
        );
        expect(wrapper.find('button')).to.have.attr('disabled');
    });

    it('should render an enabled button when both inputs are right', () => {
        const wrapper = render(
            <JobFormLogic
                pickupInput={validField}
                dropoffInput={validField}
                onPickupChange={noOp}
                onDropoffChange={noOp}
            />
        );
        expect(wrapper.find('button')).to.not.have.attr('disabled');
    });

    it('should render a disabled button if not all the inputs are valid', () => {
        const wrapper = render(
            <JobFormLogic
                pickupInput={invalidField}
                dropoffInput={validField}
                onPickupChange={noOp}
                onDropoffChange={noOp}
            />
        );
        expect(wrapper.find('button')).to.have.attr('disabled');
    });
});
