import * as React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import { CreateJobButtonLogic } from '../CreateJobButton';
import { CreateJobButtonView as CJBV } from '../CreateJobButtonView';
import { EFieldStatus } from '../../redux/field';
const CreateJobButtonView = CJBV as any;

describe('<CreateJobButton/>', () => {
    const validField = { value: '', status: EFieldStatus.valid };
    const invalidField = { value: '', status: EFieldStatus.invalid };
    const noOp = () => {};

    it('should render an enabled button when both inputs are valid', () => {
        const wrapper = shallow(
            <CreateJobButtonLogic
                pickupInput={validField}
                dropoffInput={validField}
                isCreating={false}
                onCreateJobClick={noOp}
            />
        );
        expect(wrapper).to.containMatchingElement(<CreateJobButtonView disabled={false} />);
    });

    it('should render a disabled button if not all the inputs are valid', () => {
        const wrapper = shallow(
            <CreateJobButtonLogic
                pickupInput={invalidField}
                dropoffInput={validField}
                isCreating={false}
                onCreateJobClick={noOp}
            />
        );
        expect(wrapper).to.containMatchingElement(<CreateJobButtonView disabled={true} />);
    });
    
    it('should set the button text to "Create Job" when it is not creating', () => {
        const wrapper = shallow(
            <CreateJobButtonLogic
                pickupInput={validField}
                dropoffInput={validField}
                isCreating={false}
                onCreateJobClick={noOp}
            />
        );
        expect(wrapper).to.containMatchingElement(<CreateJobButtonView text="Create Job"/>);
    });
    
    it('should set the button text to "Creating..." when it is creating', () => {
        const wrapper = shallow(
            <CreateJobButtonLogic
                pickupInput={validField}
                dropoffInput={validField}
                isCreating={true}
                onCreateJobClick={noOp}
            />
        );
        expect(wrapper).to.containMatchingElement(<CreateJobButtonView text="Creating..."/>);
    });
    
    it('should be disabled when it is creating', () => {
        const wrapper = shallow(
            <CreateJobButtonLogic
                pickupInput={validField}
                dropoffInput={validField}
                isCreating={true}
                onCreateJobClick={noOp}
            />
        );
        expect(wrapper).to.containMatchingElement(<CreateJobButtonView disabled={true}/>);
    });
});
