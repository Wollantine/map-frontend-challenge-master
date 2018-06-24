import * as React from 'react';
import {expect} from 'chai';
import {render} from 'enzyme';
import * as R from 'ramda';
import { renderStyles } from '../../../../test/felaRendererUtil';
import {CreateJobButtonView} from '../CreateJobButtonView';

const renderWithStyles = R.pipe(renderStyles, render);

describe('<CreateJobButtonView/>', () => {
    it('should render a disabled button if disabled', () => {
        const wrapper = renderWithStyles(
            <CreateJobButtonView
                disabled={true}
                text=""
                onClick={() => {}}
            />
        );
        expect(wrapper.find('button')).to.have.attr('disabled');
    });

    it('should render an enabled button if not disabled', () => {
        const wrapper = renderWithStyles(
            <CreateJobButtonView
                disabled={false}
                text=""
                onClick={() => {}}
            />
        );
        expect(wrapper.find('button')).to.not.have.attr('disabled');
    });

    it('should render text as the button text', () => {
        const text = "Test text!";
        const wrapper = renderWithStyles(
            <CreateJobButtonView
                disabled={false}
                text={text}
                onClick={() => {}}
            />
        );
        expect(wrapper.find('button')).to.have.text(text);
    });
});
