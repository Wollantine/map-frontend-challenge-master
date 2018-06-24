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

const Button = createComponent(() => ({
    borderRadius: '4px',
    height: '40px',
    textShadow: '0 1px 2px 0 rgba(16,162,234,0.30)',
    background: 'linear-gradient(#10A2EA, #0F99E8)',
    color: 'white',
    border: 'none',
    width: '100%',
    fontSize: 'small',
}), 'button', ['onClick', 'disabled']);

export const CreateJobButtonView: React.StatelessComponent<IProps> = ({disabled, text, onClick}) => (
    <ButtonContainer>
        <Button onClick={onClick} disabled={disabled}>
            {text}
        </Button>
    </ButtonContainer>
);
