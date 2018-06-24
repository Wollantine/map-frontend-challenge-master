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

    it('should render a JobFormView', () => {
        const wrapper = shallow(
            <JobFormLogic
                pickupInput={emptyField}
                dropoffInput={emptyField}
                onPickupChange={noOp}
                onDropoffChange={noOp}
            />
        );
        expect(wrapper).to.containMatchingElement(<JobFormView/>);
    });
});
