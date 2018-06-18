import * as React from 'react';
import { TField } from './redux/jobFormReducer';

export type TFieldProps<T> = TField<T> & {
    onChange: (value: T) => void;
};

interface IProps {
    pickupInput: TField<string>;
    dropoffInput: TField<string>;
}

const JobFormView: React.StatelessComponent<IProps> = () => <p>Hi!</p>;

export default JobFormView;
