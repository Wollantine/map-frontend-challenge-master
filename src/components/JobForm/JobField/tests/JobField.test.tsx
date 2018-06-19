import * as React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import {JobField, IProps} from '../JobField';
import { EFieldStatus } from '../../redux/field';

describe('<JobField/>', () => {
    const icon = 'test.svg';
    const invalidIcon = 'testInvalid.svg';
    const validIcon = 'testValid.svg';

    const props: IProps = {
        value: '',
        status: EFieldStatus.pristine,
        icon,
        invalidIcon,
        validIcon,
        onChange: () => {},
    };

    it('should render an input', () => {
        const wrapper = render(<JobField {...props} />);
        expect(wrapper).to.have.exactly(1).descendants('input');
    });

    it('should render the icon if the input is pristine', () => {
        const wrapper = render(<JobField {...props}/>);
        expect(wrapper.children('img').last()).to.have.attr('src', icon);
    });

    it('should render the invalidIcon if the input is invalid', () => {
        const wrapper = render(<JobField {...props} status={EFieldStatus.invalid} />);
        expect(wrapper.children('img').last()).to.have.attr('src', invalidIcon);
    });

    it('should render a green icon if the input is a success', () => {
        const wrapper = render(<JobField {...props} status={EFieldStatus.valid} />);
        expect(wrapper.children('img').last()).to.have.attr('src', validIcon);
    });
});
