import {expect} from 'chai';
import { isGeocode, geocodeOrError, geocodeAddress } from './geocode';
import { Either } from 'tsmonad/lib/src';
import { EErrorType } from './jobsApi';
import { promises } from 'fs';

describe('geocode', () => {
    describe('isGeocode', () => {
        it('should return true if data has all geocode fields', () => {
            const sut = isGeocode({address: '', latitude: 0, longitude: 0});
            expect(sut).to.be.true;
        });

        it('should return false if data is not a geocode', () => {
            const sut = isGeocode({address: '', latitude: 0});
            expect(sut).to.be.false;
        });

        it('should return false if data is null', () => {
            const sut = isGeocode(null);
            expect(sut).to.be.false;
        });
    });

    describe('geocodeOrError', () => {
        it('should return Either.right with data if it is a geocode', () => {
            const data = {address: 'test', latitude: 1, longitude: 42};
            const sut = geocodeOrError(data);
            expect(sut.caseOf({
                left: () => null,
                right: x => x,
            })).to.deep.equal(data);
        });

        it('should return Either.left with an unexpected error if data is not a geocode', () => {
            const sut = geocodeOrError({});
            expect(sut.caseOf({
                left: err => err,
                right: () => null,
            })).to.be.ok.and.to.have.property('type', EErrorType.UNEXPECTED_ERROR);
        });
    });

    describe('geocodeAddress', () => {
        it('should resolve to a geocode if the response is a geocode', () => {
            const geocode = {address: 'test', latitude: 1, longitude: 42};
            const responsePromise = new Promise((res: Function) => res({data: geocode}));
            return expect(geocodeAddress(responsePromise)).to.eventually.satisfy((res: Either<any, any>) => {
                return res.caseOf({
                    left: () => false,
                    right: x => x === geocode,
                });
            });
        });

        it('should resolve to a GEOCODE_ERROR if the response says so', () => {
            const error = {
                response: {
                    data: {
                        code: 'GEOCODE_ERROR',
                        message: '\"\" cannot be geocoded.',
                    }
                }
            };
            const responsePromise = new Promise((res, rej) => rej(error));
            return expect(geocodeAddress(responsePromise)).to.eventually.satisfy(((res: Either<any, any>) => {
                return res.caseOf({
                    left: x => x.type === EErrorType.GEOCODE_ERROR,
                    right: () => false,
                });
            }));
        });

        it('should resolve to an UNEXPECTED_ERROR for any other error', () => {
            const responsePromise = new Promise((res, rej) => rej(null));
            return expect(geocodeAddress(responsePromise)).to.eventually.satisfy((res: Either<any, any>) => {
                return res.caseOf({
                    left: x => x.type === EErrorType.UNEXPECTED_ERROR,
                    right: () => false,
                });
            });
        });
    });
});
