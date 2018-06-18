import * as React from 'react';
import {expect} from 'chai';
import {render} from 'enzyme';
import {JobFormView} from '../JobFormView';
import { EFieldStatus } from '../redux/jobFormState';

describe('<JobFormView/>', () => {
    const emptyField = { value: '', status: EFieldStatus.pristine, onChange: () => { } };
    const validField = { value: '', status: EFieldStatus.valid, onChange: () => { } };
    const invalidField = { value: '', status: EFieldStatus.invalid, onChange: () => { } };

    it('should render two input fields', () => {
        const wrapper = render(
            <JobFormView
                pickupInput={emptyField}
                dropoffInput={emptyField}
            />
        );
        expect(wrapper).to.have.exactly(2).descendants('input');
    });

    it('should render a disabled button by default', () => {
        const wrapper = render(
            <JobFormView
                pickupInput={emptyField}
                dropoffInput={emptyField}
            />
        );
        expect(wrapper.find('button')).to.have.attr('disabled');
    });

    it('should render an enabled button when both inputs are right', () => {
        const wrapper = render(
            <JobFormView
                pickupInput={validField}
                dropoffInput={validField}
            />
        );
        expect(wrapper.find('button')).to.not.have.attr('disabled');
    });

    it('should render a disabled button if not all the inputs are valid', () => {
        const wrapper = render(
            <JobFormView
                pickupInput={invalidField}
                dropoffInput={validField}
            />
        );
        expect(wrapper.find('button')).to.have.attr('disabled');
    });
});
