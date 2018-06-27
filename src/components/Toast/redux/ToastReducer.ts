import { combineReducers } from "redux";
import { TAction } from "../../../redux/appReducer";
import { IToast } from "./ToastState";
import { QUEUE_TOAST, SKIP_TOAST } from "./ToastActions";

export const queue = (state: IToast[] = [], action: TAction): IToast[] => {
    switch (action.type) {
        case QUEUE_TOAST:
            const {message, toastType} = action;
            return [...state, {message, toastType}];
        case SKIP_TOAST:
            const [_, ...tail] = state;
            return tail;
        default:
            return state;
    }
}

export default combineReducers({
    queue,
});
