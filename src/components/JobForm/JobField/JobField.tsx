import * as React from 'react';
import { EFieldStatus } from '../redux/field';
import {createComponent} from 'react-fela';


export interface IProps {
    value: string;
    placeholder?: string;
    status: EFieldStatus;
    icon: string;
    validIcon: string;
    invalidIcon: string;
    onChange: (value: string) => void;
}

const Div = createComponent(() => ({
    display: 'flex',
    marginBottom: '16px',
}));

const Image = createComponent(() => ({
    marginRight: '8px',
    height: '32px',
}), 'img', ['src']);

const Input = createComponent(({value}) => ({
    borderRadius: '4px',
    height: '32px',
    background: '#F0F3F7',
    color: value === '' ? '#252525' : '#8596A6',
    border: 'none',
    fontSize: 'medium',
    paddingLeft: '7px',
}), 'input', ['type', 'placeholder', 'onChange']);

export const JobField: React.StatelessComponent<IProps> = (props) => {
    const {value, placeholder, onChange, status, icon, validIcon, invalidIcon} = props;
    const image = {
        [EFieldStatus.pristine]: icon,
        [EFieldStatus.valid]: validIcon,
        [EFieldStatus.invalid]: invalidIcon,
    }[status];
    const changeHolder = (e: any) => onChange(e.target.value);
    return (
        <Div>
            <Image src={image}/>
            <Input type="text" value={value} placeholder={placeholder} onChange={changeHolder}/>
        </Div>
    );
}
