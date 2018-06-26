import * as React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import {JobField, IProps} from './JobField';
import { EFieldStatus } from '../redux/field';
import * as R from 'ramda';
import { renderStyles } from '../../../test/felaRendererUtil';

const renderWithStyles = R.pipe(renderStyles, render);

describe('<JobField/>', () => {
    const icon = 'test.svg';
    const invalidIcon = 'testInvalid.svg';
    const validIcon = 'testValid.svg';
    const value = '42 Rue du Test';

    const props: IProps = {
        value,
        status: EFieldStatus.pristine,
        icon,
        invalidIcon,
        validIcon,
        onChange: () => {},
        onBlur: () => {},
    };

    it('should render an input', () => {
        const wrapper = renderWithStyles(<JobField {...props} />);
        expect(wrapper).to.have.exactly(1).descendants('input');
    });

    it('should render the value inside the input', () => {
        const wrapper = renderWithStyles(<JobField {...props} />);
        expect(wrapper.children('input')).to.have.attr('value', value);
    });

    it('should render the icon if the input is pristine', () => {
        const wrapper = renderWithStyles(<JobField {...props}/>);
        expect(wrapper.children('img')).to.have.attr('src', icon);
    });

    it('should render the invalidIcon if the input is invalid', () => {
        const wrapper = renderWithStyles(<JobField {...props} status={EFieldStatus.invalid} />);
        expect(wrapper.children('img')).to.have.attr('src', invalidIcon);
    });

    it('should render a green icon if the input is a success', () => {
        const wrapper = renderWithStyles(<JobField {...props} status={EFieldStatus.valid} />);
        expect(wrapper.children('img')).to.have.attr('src', validIcon);
    });
});
