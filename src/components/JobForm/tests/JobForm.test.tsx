import * as React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {JobFormLogic} from '../JobForm';
import { EFieldStatus } from '../redux/field';
import { JobFormView as JFV } from '../JobFormView';
const JobFormView = JFV as any;

describe('<JobForm/>', () => {
    const noOp = () => {};
    const emptyField = { value: '', status: EFieldStatus.pristine };
    const validField = { value: '', status: EFieldStatus.valid };
    const invalidField = { value: '', status: EFieldStatus.invalid };

    it('should render a JobFormView', () => {
        const wrapper = shallow(
            <JobFormLogic
                pickupInput={emptyField}
                dropoffInput={emptyField}
                isCreating={false}
                onPickupChange={noOp}
                onDropoffChange={noOp}
            />
        );
        expect(wrapper).to.containMatchingElement(<JobFormView/>);
    });

    it('should render a disabled button by default', () => {
        const wrapper = shallow(
            <JobFormLogic
                pickupInput={emptyField}
                dropoffInput={emptyField}
                isCreating={false}
                onPickupChange={noOp}
                onDropoffChange={noOp}
            />
        );
        expect(wrapper).to.containMatchingElement(<JobFormView isButtonDisabled={true}/>);
    });

    it('should render an enabled button when both inputs are right', () => {
        const wrapper = shallow(
            <JobFormLogic
                pickupInput={validField}
                dropoffInput={validField}
                isCreating={false}
                onPickupChange={noOp}
                onDropoffChange={noOp}
            />
        );
        expect(wrapper).to.containMatchingElement(<JobFormView isButtonDisabled={false} />);
    });

    it('should render a disabled button if not all the inputs are valid', () => {
        const wrapper = shallow(
            <JobFormLogic
                pickupInput={invalidField}
                dropoffInput={validField}
                isCreating={false}
                onPickupChange={noOp}
                onDropoffChange={noOp}
            />
        );
        expect(wrapper).to.containMatchingElement(<JobFormView isButtonDisabled={true} />);
    });
});
