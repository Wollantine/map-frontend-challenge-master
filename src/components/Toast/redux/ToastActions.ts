import { EToastType } from "./ToastState";

export const QUEUE_TOAST = 'QUEUE_TOAST';
export const SKIP_TOAST = 'SKIP_TOAST';


export const queueToast = (message: string, toastType: EToastType) => ({
    type: QUEUE_TOAST,
    message,
    toastType,
});

export const skipToast = () => ({
    type: SKIP_TOAST,
});
