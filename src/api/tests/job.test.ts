import {expect} from 'chai';
import { createJob } from '../job';
import { Either } from 'tsmonad';
import { TError, EErrorType } from '../jobsApi';

describe('job', () => {
    describe('createJob', () => {
        it('should resolve to Either.right if the request succeeds', () => {
            const responsePromise = new Promise((res: Function) => res());
            return expect(createJob(responsePromise)).to.eventually.satisfy((res: Either<any, any>) => {
                return res.caseOf({
                    left: () => false,
                    right: () => true,
                });
            });
        });

        it('should resolve to an UNEXPECTED_ERROR if the request fails', () => {
            const responsePromise = new Promise((res: Function, rej: Function) => rej());
            return expect(createJob(responsePromise)).to.eventually.satisfy((res: Either<any, any>) => {
                return res.caseOf({
                    left: (error: TError) => error.type === EErrorType.UNEXPECTED_ERROR,
                    right: () => false,
                });
            });
        });
    });
});
