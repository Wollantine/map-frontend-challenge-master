import { EToastType, IToast } from "./ToastState";

export const QUEUE_TOAST = 'QUEUE_TOAST';
export const DISMISS_TOAST = 'DISMISS_TOAST';
export const SHOW_TOAST = 'SHOW_TOAST';


export const queueToast = (message: string, toastType: EToastType) => ({
    type: QUEUE_TOAST,
    message,
    toastType,
});

export const dismissToast = () => ({
    type: DISMISS_TOAST,
});

export const showToast = (toast: IToast) => ({
    type: SHOW_TOAST,
    toast,
});
