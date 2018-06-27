import { IState, toastSelector } from "../../../redux/appState";

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
}

export const queueSelector = (state: IState): IToast[] => toastSelector(state).queue;
