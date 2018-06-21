import * as React from 'react';
import {TField} from './redux/field';
import { JobField } from './JobField/JobField';
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

export const JobFormView: React.StatelessComponent<IProps> = (props) => {
    const {pickupInput, dropoffInput, isButtonCreating, isButtonDisabled} = props;
    return (
        <div>
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
            <button onClick={() => {}} disabled={isButtonDisabled}>
                {isButtonCreating ? 'Creating...' : 'Create Job'}
            </button>
        </div>
    );
};
