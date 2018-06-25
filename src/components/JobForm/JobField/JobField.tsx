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
    onBlur: () => void;
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
    color: value === '' ? '#8596A6' : '#252525',
    border: 'none',
    fontSize: 'small',
    paddingLeft: '7px',
    width: '100%',
}), 'input', ['type', 'placeholder', 'value', 'onChange', 'onBlur']);

export const JobField: React.StatelessComponent<IProps> = (props) => {
    const {value, placeholder, onChange, onBlur, status, icon, validIcon, invalidIcon} = props;
    const image = {
        [EFieldStatus.pristine]: icon,
        [EFieldStatus.valid]: validIcon,
        [EFieldStatus.invalid]: invalidIcon,
    }[status];
    const changeHolder = (e: any) => onChange(e.target.value);
    return (
        <Div>
            <Image src={image}/>
            <Input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={changeHolder}
                onBlur={onBlur}
            />
        </Div>
    );
}
