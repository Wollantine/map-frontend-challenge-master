import * as React from 'react';
import {TField} from './redux/field';

export type TFieldProps<T> = TField<T> & {
    onChange: (value: T) => void;
};

interface IProps {
    pickupInput: TFieldProps<string>;
    dropoffInput: TFieldProps<string>;
    isButtonDisabled: boolean;
    isButtonCreating: boolean;
}

export const JobFormView: React.StatelessComponent<IProps> = () => <p>Hi!</p>;
