import {combineReducers} from 'redux';
import { jobFormReducer } from '../components/JobForm/redux/jobFormReducer';

export type TAction = {
    [key: string]: any;
    type: string;
};

export const appReducer = combineReducers({
    jobForm: jobFormReducer,
});
