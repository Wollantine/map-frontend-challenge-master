import * as React from 'react';
import { createComponent } from 'react-fela';
import { EToastType, IToast } from './redux/ToastState';
import * as R from 'ramda';
import { Transition } from 'react-spring';
import { Maybe } from 'tsmonad';
import { delay } from 'redux-saga';

export interface IProps {
    maybeToast: Maybe<IToast>;
    onClick: () => void;
}

const DELAY = 50000;

const toastColors = {
    [EToastType.error]: 'rgba(90, 30, 30, 0.90)',
    [EToastType.success]: 'rgba(51, 51, 51, 0.90)',
};

const toastColor = (toastType: EToastType) => (
    R.defaultTo(toastColors[EToastType.success], toastColors[toastType])
);

const Toast = createComponent(({opacity, top, right, toastType}) => ({
    opacity,
    top,
    right,
    position: 'fixed',
    borderRadius: '8px',
    height: '40px',
    lineHeight: '40px',
    color: '#dddddd',
    textShadow: '1px 2px rgba(0, 0, 0, 0.10)',
    paddingLeft: '15px',
    paddingRight: '15px',
    cursor: 'pointer',
    backgroundColor: toastColor(toastType),
    boxShadow: '0 1px 8px 0 rgba(0, 0, 0, 0.10)',
}), 'div', ['onClick']);



export const ToastView: React.StatelessComponent<IProps> = ({maybeToast, onClick}) => {
    const ToastComponent = (props: any) => (
        <Toast key="0" {...props} toastType={props.toast.toastType} onClick={onClick}>
            <span>{props.toast.message}</span>
        </Toast>
    );
        
    return (
        <Transition
            from={{opacity: 0, top: '-100px', right: '32px'}}
            enter={{opacity: 1, top: '32px', right: '32px'}}
            leave={{opacity: 0, top: '32px', right: '-100px'}}
        >
            {maybeToast.caseOf({
                nothing: () => (() => null) as any,
                just: (toast) => (props: any) => <ToastComponent toast={toast} {...props}/>
            })}
        </Transition>
    )
};
