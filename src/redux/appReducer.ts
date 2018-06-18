import {combineReducers} from 'redux';
import { jobFormReducer } from '../components/JobForm/redux/jobFormReducer';

export const appReducer = combineReducers({
    jobForm: jobFormReducer,
});
