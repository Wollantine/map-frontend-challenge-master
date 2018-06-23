import {combineReducers} from 'redux';
import {TField, EFieldStatus} from './field';
import { START_CREATING_JOB, FINISH_CREATING_JOB, UPDATE_FIELD } from './JobFormActions';

export type TAction = {
    [key: string]: any;
    type: string;
}

const emptyField = <T>(value: T) => ({value, status: EFieldStatus.pristine});

export const fieldReducer = <T>(fieldName: string, initialValue: T) => (
    (state: TField<T> = emptyField(initialValue), action: TAction): TField<T> => {
        switch (action.type) {
            case UPDATE_FIELD:
                const isSameField = action.fieldName === fieldName;
                return isSameField
                    ? {value: action.value, status: action.status}
                    : state;
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
