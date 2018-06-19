import {IJobFormState} from '../components/JobForm/redux/jobFormState';

export interface IState {
    jobForm: IJobFormState;
}

export const jobFormSelector = (state: IState): IJobFormState => state.jobForm;
