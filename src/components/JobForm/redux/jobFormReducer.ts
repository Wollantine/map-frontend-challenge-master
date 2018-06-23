import {combineReducers} from 'redux';
import {TField, EFieldStatus} from './field';

export type TAction = {
    [key: string]: any;
    type: string;
}

const emptyField = <T>(value: T) => ({value, status: EFieldStatus.pristine});

export const fieldReducer = <T>(fieldName: string, initialValue: T) => (
    (state: TField<T> = emptyField(initialValue), action: TAction): TField<T> => {
        switch (action.type) {
            default:
                return state;
        }
    }
)

export const creating = (state: boolean = false, action: TAction): boolean => {
    switch (action.type) {
        default:
            return state;
    }
};


export const jobFormReducer = combineReducers({
    pickup: fieldReducer<string>('pickup', ''),
    dropoff: fieldReducer<string>('dropoff', ''),
    creating,
});
