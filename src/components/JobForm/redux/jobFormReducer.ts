import {combineReducers} from 'redux';
import {TField, EFieldStatus} from './field';
import { START_CREATING_JOB, FINISH_CREATING_JOB, UPDATE_FIELD, UPDATE_GEOCODE, VALIDATE_FIELD } from './jobFormActions';
import { TReducer } from '../../../redux/appReducer';
import { reduceWhen, actionHasField, actionIs } from '../../../redux/genericReducers';
import { emptyField } from './jobFormState';
import * as R from 'ramda';

export type TAction = {
    [key: string]: any;
    type: string;
}

const field = <T>(initialValue: T): TReducer<TField<T>> => (
    (state: TField<T> = emptyField(initialValue), action: TAction): TField<T> => {
        switch (action.type) {
            case UPDATE_FIELD:
                return {
                    status: EFieldStatus.pristine,
                    value: action.value,
                };
            case VALIDATE_FIELD:
                return {
                    ...state,
                    status: action.status,
                }
            case UPDATE_GEOCODE:
                return {...state, status: EFieldStatus.valid};
            case FINISH_CREATING_JOB:
                return emptyField(initialValue);
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

export const fieldReducer = (
    fieldName: string,
    initialValue: string
): TReducer<TField<string>> => (
    reduceWhen(
        R.either(actionHasField(fieldName), actionIs(FINISH_CREATING_JOB)),
        field(initialValue),
        emptyField(initialValue)
    )
);

export const jobFormReducer = combineReducers({
    pickup: fieldReducer('pickup', ''),
    dropoff: fieldReducer('dropoff', ''),
    creating,
});
