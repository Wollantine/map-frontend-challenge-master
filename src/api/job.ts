import {Either} from 'tsmonad';
import { TError, processedError } from './jobsApi';

export type TJob = {pickup: string, dropoff: string};

export const JOB_ENDPOINT = '/jobs';

export function createJob(responsePromise: Promise<{}>): Promise<Either<TError, void>> {
    return responsePromise
        .then(() => Either.right(undefined))
        .catch((error) => processedError(error));
}
