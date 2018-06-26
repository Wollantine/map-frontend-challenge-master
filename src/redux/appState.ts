import {IJobFormState} from '../components/JobForm/redux/jobFormState';
import { IMapState } from '../components/Map/redux/MapState';

export interface IState {
    jobForm: IJobFormState;
    map: IMapState;
}

export type TSelector<T> = (state: IState) => T;

export const jobFormSelector: TSelector<IJobFormState> = (state) => state.jobForm;
export const mapSelector: TSelector<IMapState> = (state) => state.map;
