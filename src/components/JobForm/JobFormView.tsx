import * as React from 'react';
import {TField} from './redux/field';
import { JobField } from './JobField/JobField';
import { createComponent } from 'react-fela';
import { CreateJobButton } from './CreateJobButton/CreateJobButton';
const pickupBadgeBlank = require('../../../assets/pickUpBadgeBlank.svg');
const pickupBadgeError = require('../../../assets/pickUpBadgeError.svg');
const pickupBadgePresent = require('../../../assets/pickUpBadgePresent.svg');
const dropoffBadgeBlank = require('../../../assets/dropOffBadgeBlank.svg');
const dropoffBadgeError = require('../../../assets/dropOffBadgeError.svg');
const dropoffBadgePresent = require('../../../assets/dropOffBadgePresent.svg');

export type TFieldProps<T> = TField<T> & {
    onChange: (value: T) => void;
    onBlur: () => void;
};

interface IProps {
    pickupInput: TFieldProps<string>;
    dropoffInput: TFieldProps<string>;
}

const Div = createComponent(() => ({
    width: '300px',
    backgroundColor: 'white',
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


export const JobFormView: React.StatelessComponent<IProps> = (props) => {
    const {pickupInput, dropoffInput} = props;
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
            <CreateJobButton/>
        </Div>
    );
};
