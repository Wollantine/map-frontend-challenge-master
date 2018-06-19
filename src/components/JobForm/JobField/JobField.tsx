import * as React from 'react';
import { EFieldStatus } from '../redux/field';

export interface IProps {
    value: string;
    placeholder?: string;
    status: EFieldStatus;
    icon: string;
    validIcon: string;
    invalidIcon: string;
    onChange: (value: string) => void;
}

export const JobField: React.StatelessComponent<IProps> = () => <span>Ho!</span>;
