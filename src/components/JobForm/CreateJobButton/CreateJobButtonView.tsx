import * as React from 'react';
import {createComponent} from 'react-fela';

export interface IProps {
    disabled: boolean;
    text: string;
    onClick: () => void;
}

const ButtonContainer = createComponent(() => ({
    marginLeft: '40px',
}));

const Button = createComponent(({disabled}) => ({
    borderRadius: '4px',
    height: '40px',
    textShadow: '1px 2px rgba(16,162,234,0.30)',
    background: 'linear-gradient(#10A2EA, #0F99E8)',
    color: 'white',
    border: 'none',
    width: '100%',
    fontSize: 'small',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'initial' : 'pointer',
}), 'button', ['onClick', 'disabled']);

export const CreateJobButtonView: React.StatelessComponent<IProps> = ({disabled, text, onClick}) => (
    <ButtonContainer>
        <Button onClick={onClick} disabled={disabled}>
            {text}
        </Button>
    </ButtonContainer>
);
