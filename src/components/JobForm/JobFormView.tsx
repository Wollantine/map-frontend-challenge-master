import * as React from 'react';

export enum EFieldStatus {
    pristine,
    invalid,
    valid,
}

type TFieldProps<T> = {
    value: T;
    status: EFieldStatus;
    onChange: (value: T) => void;
};

interface IProps {
    pickupInput: TFieldProps<string>;
    dropoffInput: TFieldProps<string>;
}

const JobFormView: React.StatelessComponent<IProps> = () => <p>Hi!</p>;

export default JobFormView;
