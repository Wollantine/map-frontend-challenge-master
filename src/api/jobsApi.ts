import {Either} from 'tsmonad';
import * as R from 'ramda';
import { axios } from '../config/axios';

export enum EErrorType {
    GEOCODE_ERROR = 'GEOCODE_ERROR',
    UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}

export type TError = {
    message: string;
    type: EErrorType;
};

export function post<Output>(endpoint: string, data: any): Promise<Output | any> {
    return axios.post(endpoint, data);
}

export function processedError(error: any): Either<TError, any> {
    const errorCode = R.pathOr(EErrorType.UNEXPECTED_ERROR, ['response', 'data', 'code'], error);
    const type = R.defaultTo(EErrorType.UNEXPECTED_ERROR, EErrorType[errorCode]);
    const message = R.propOr('', 'message', error);
    return Either.left({message, type});
}

export function unexpectedDataError(data: any): TError {
    return {
        message: 'Unexpected response: ' + JSON.stringify(data),
        type: EErrorType.UNEXPECTED_ERROR,
    };
}
