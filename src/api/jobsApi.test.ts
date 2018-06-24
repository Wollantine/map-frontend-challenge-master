import {expect} from 'chai';
import { EErrorType, processedError } from './jobsApi';

describe('jobsApi', () => {
    describe('processedError', () => {
        it('should return Either.left of an error with the appropriate code', () => {
            const error = {
                response: {
                    data: {
                        code: EErrorType[EErrorType.GEOCODE_ERROR],
                        message: 'Wrong address',
                    }
                }
            };
            expect(processedError(error).caseOf({
                left: x => x.type === EErrorType.GEOCODE_ERROR,
                right: () => false,
            })).to.be.true;
        });

        it('should return Either.left of an unexpected error if the code was not found', () => {
            const error = {
                response: {
                    data: {
                        code: 'NON_EXISTING_ERROR_CODE',
                        message: 'You broke the database again',
                    }
                }
            };
            expect(processedError(error).caseOf({
                left: x => x.type === EErrorType.UNEXPECTED_ERROR,
                right: () => false,
            })).to.be.true;
        });

        it('should return Either.left of an unexpected error if the error has no code', () => {
            const error = 'This time you broke the whole API!';
            expect(processedError(error).caseOf({
                left: x => x.type === EErrorType.UNEXPECTED_ERROR,
                right: () => false,
            })).to.be.true;
        });
    });
});
