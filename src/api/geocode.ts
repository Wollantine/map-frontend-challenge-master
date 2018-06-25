import {Either} from 'tsmonad';
import * as R from 'ramda';
import { TError, processedError, unexpectedDataError } from './jobsApi';

export type TGeocode = {
    address: string;
    latitude: number;
    longitude: number;
};

export const GEOCODE_ENDPOINT = '/geocode';

export function geocodeAddress(responsePromise: Promise<TGeocode | any>): Promise<Either<TError, TGeocode>> {
    return responsePromise.then((response) => {
        return geocodeOrError(R.propOr({}, 'data', response));
    }).catch((error) => {
        return processedError(error);
    });
}

export function isGeocode(data: any): data is TGeocode {
    return !R.isNil(data) &&
        (data as TGeocode).address !== undefined &&
        (data as TGeocode).latitude !== undefined &&
        (data as TGeocode).longitude !== undefined;
}

export function geocodeOrError(data: any): Either<TError, TGeocode> {
    return isGeocode(data)
        ? Either.right(data)
        : Either.left(unexpectedDataError(data));
}
