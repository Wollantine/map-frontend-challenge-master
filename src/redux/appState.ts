import {IJobFormState} from '../components/JobForm/redux/jobFormState';

export interface IState {
    jobForm: IJobFormState;
}

export type TSelector<T> = (state: IState) => T;

export const jobFormSelector: TSelector<IJobFormState> = (state) => state.jobForm;
