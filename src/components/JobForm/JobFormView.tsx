import * as React from 'react';
import {TField} from './redux/field';
import { JobField } from './JobField/JobField';
import { createComponent } from 'react-fela';
const pickupBadgeBlank = require('../../../assets/pickUpBadgeBlank.svg');
const pickupBadgeError = require('../../../assets/pickUpBadgeError.svg');
const pickupBadgePresent = require('../../../assets/pickUpBadgePresent.svg');
const dropoffBadgeBlank = require('../../../assets/dropOffBadgeBlank.svg');
const dropoffBadgeError = require('../../../assets/dropOffBadgeError.svg');
const dropoffBadgePresent = require('../../../assets/dropOffBadgePresent.svg');

export type TFieldProps<T> = TField<T> & {
    onChange: (value: T) => void;
};

interface IProps {
    pickupInput: TFieldProps<string>;
    dropoffInput: TFieldProps<string>;
    isButtonDisabled: boolean;
    isButtonCreating: boolean;
}

const Div = createComponent(() => ({
    width: '300px',
    padding: '16px',
    marginTop: '32px',
    marginLeft: '32px',
    borderRadius: '8px',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.10)',
    position: 'fixed',
    ':hover,:focus': {
        boxShadow: '0 1px 8px 0 rgba(0,0,0,0.10)'
    }
}));

const ButtonContainer = createComponent(() => ({
    marginLeft: '40px',
}));

const Button = createComponent(() => ({
    borderRadius: '4px',
    height: '40px',
    textShadow: '0 1px 2px 0 rgba(16,162,234,0.30)',
    background: 'linear-gradient(#10A2EA, #0F99E8)',
    color: 'white',
    border: 'none',
    width: '100%',
    fontSize: 'small',
}), 'button', ['onClick', 'disabled']);

export const JobFormView: React.StatelessComponent<IProps> = (props) => {
    const {pickupInput, dropoffInput, isButtonCreating, isButtonDisabled} = props;
    return (
        <Div>
            <JobField
                {...pickupInput}
                placeholder="Pick up address"
                icon={pickupBadgeBlank}
                invalidIcon={pickupBadgeError}
                validIcon={pickupBadgePresent}
            />
            <JobField
                {...dropoffInput}
                placeholder="Drop off address"
                icon={dropoffBadgeBlank}
                invalidIcon={dropoffBadgeError}
                validIcon={dropoffBadgePresent}
            />
            <ButtonContainer>
                <Button onClick={() => {}} disabled={isButtonDisabled}>
                    {isButtonCreating ? 'Creating...' : 'Create Job'}
                </Button>
            </ButtonContainer>
        </Div>
    );
};
