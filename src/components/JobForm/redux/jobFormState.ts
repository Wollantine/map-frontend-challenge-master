import {IState, jobFormSelector} from '../../../redux/appState';

export enum EFieldStatus {
    pristine,
    invalid,
    valid,
}

export type TField<T> = {
    value: T;
    status: EFieldStatus;
};

export interface IJobFormState {
    pickup: TField<string>;
    dropoff: TField<string>;
    creating: boolean;
}

export const pickupSelector = (state: IState) => jobFormSelector(state).pickup;
export const dropoffSelector = (state: IState) => jobFormSelector(state).dropoff;
export const creatingSelector = (state: IState) => jobFormSelector(state).creating;
