import { IState, toastSelector } from '../../../redux/appState';
import { Maybe } from 'tsmonad';

export enum EToastType {
    error,
    success,
};

export interface IToast {
    message: string;
    toastType: EToastType;
}

export interface IToastState {
    queue: IToast[];
    current: Maybe<IToast>;
}

export const queueSelector = (state: IState): IToast[] => toastSelector(state).queue;
export const currentSelector = (state: IState): Maybe<IToast> => toastSelector(state).current;
