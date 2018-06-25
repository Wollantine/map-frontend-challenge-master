import {combineReducers} from 'redux';
import {TField, EFieldStatus} from './field';
import { START_CREATING_JOB, FINISH_CREATING_JOB, UPDATE_FIELD, UPDATE_GEOCODE } from './jobFormActions';
import * as R from 'ramda';

export type TAction = {
    [key: string]: any;
    type: string;
}

const emptyField = <T>(value: T) => ({value, status: EFieldStatus.pristine});

const isSameField = (fieldName: string, action: TAction) => action.fieldName === fieldName;

export const fieldReducer = <T>(fieldName: string, initialValue: T) => (
    (state: TField<T> = emptyField(initialValue), action: TAction): TField<T> => {
        switch (action.type) {
            case UPDATE_FIELD:
                const {value, status} = action;
                return isSameField(fieldName, action)
                    ? {
                        ...state,
                        ...(R.isNil(value) ? {} : {value}),
                        ...(R.isNil(status) ? {} : {status}),
                    }
                    : state;
            case UPDATE_GEOCODE:
                return {
                    ...state,
                    status: isSameField(fieldName, action) ? EFieldStatus.valid : state.status,
                }
            default:
                return state;
        }
    }
)

export const creating = (state: boolean = false, action: TAction): boolean => {
    switch (action.type) {
        case START_CREATING_JOB:
            return true;
        case FINISH_CREATING_JOB:
            return false;
        default:
            return state;
    }
};


export const jobFormReducer = combineReducers({
    pickup: fieldReducer<string>('pickup', ''),
    dropoff: fieldReducer<string>('dropoff', ''),
    creating,
});
