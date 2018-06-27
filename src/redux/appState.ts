import {IJobFormState} from '../components/JobForm/redux/jobFormState';
import { IMapState } from '../components/Map/redux/MapState';
import { IToastState } from '../components/Toast/redux/ToastState';

export interface IState {
    jobForm: IJobFormState;
    map: IMapState;
    toast: IToastState;
}

export type TSelector<T> = (state: IState) => T;

export const jobFormSelector: TSelector<IJobFormState> = (state) => state.jobForm;
export const mapSelector: TSelector<IMapState> = (state) => state.map;
export const toastSelector: TSelector<IToastState> = (state) => state.toast;
