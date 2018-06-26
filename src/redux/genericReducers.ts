import { TAction } from "../components/JobForm/redux/jobFormReducer";
import { TReducer } from "./appReducer";

export const actionHasField = (fieldName: string) => (_: any, action: TAction) => action.fieldName === fieldName;

export const reduceWhen = <T>(
    condition: (state: any, action: TAction) => boolean,
    reducer: TReducer<T>,
    initialState: T,
): TReducer<T> => (state: T = initialState, action: TAction): T => {
    return condition(state, action)
        ? reducer(state, action)
        : state;
};
