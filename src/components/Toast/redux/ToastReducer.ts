import { combineReducers } from "redux";
import { TAction } from "../../../redux/appReducer";
import { IToast } from "./ToastState";
import { QUEUE_TOAST, DISMISS_TOAST, SHOW_TOAST } from "./ToastActions";
import { Maybe } from "tsmonad";

export const queue = (state: IToast[] = [], action: TAction): IToast[] => {
    switch (action.type) {
        case QUEUE_TOAST:
            const {message, toastType} = action;
            return [...state, {message, toastType}];
        case SHOW_TOAST:
            const [_, ...tail] = state;
            return tail;
        default:
            return state;
    }
}

export const current = (state: Maybe<IToast> = Maybe.nothing(), action: TAction): Maybe<IToast> => {
    switch (action.type) {
        case SHOW_TOAST:
            return Maybe.just(action.toast);
        case DISMISS_TOAST:
            return Maybe.nothing();
        default:
            return state;
    }
}

export default combineReducers({
    queue,
    current,
});
