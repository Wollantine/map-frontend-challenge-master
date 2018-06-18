import * as React from 'react';
import {TField} from './redux/jobFormState';

export type TFieldProps<T> = TField<T> & {
    onChange: (value: T) => void;
};

interface IProps {
    pickupInput: TFieldProps<string>;
    dropoffInput: TFieldProps<string>;
    isButtonDisabled: boolean;
    isButtonCreating: boolean;
}

const JobFormView: React.StatelessComponent<IProps> = () => <p>Hi!</p>;

export default JobFormView;
