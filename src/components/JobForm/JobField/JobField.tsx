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

export const JobField: React.StatelessComponent<IProps> = (props) => {
    const {value, placeholder, onChange, status, icon, validIcon, invalidIcon} = props;
    const image = {
        [EFieldStatus.pristine]: icon,
        [EFieldStatus.valid]: validIcon,
        [EFieldStatus.invalid]: invalidIcon,
    }[status];
    const changeHolder = (e: any) => onChange(e.target.value);
    return (
        <span>
            <img src={image}/>
            <input type="text" value={value} placeholder={placeholder} onChange={changeHolder}/>
        </span>
    );
}
