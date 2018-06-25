import {expect} from 'chai';
import { fieldReducer, creating } from "../jobFormReducer";
import { EFieldStatus } from '../field';
import { updateField, startCreatingJob, finishCreatingJob } from '../jobFormActions';

describe('jobFormReducer', () => {
    describe('fieldReducer', () => {
        it('should return a reducer', () => {
            const sut = fieldReducer('test', '');
            const state = sut(undefined, {type: 'UNDEFINED_ACTION'});
            expect(sut(state, {type: 'UNDEFINED_ACTION'})).to.deep.equal(state);
        });

        describe('returned reducer', () => {
            const name = 'testField';
            const initialState = 'test';
            const reducer = fieldReducer(name, initialState);

            it('should return a TField', () => {
                const state = reducer(undefined, {type: 'UNDEFINED_ACTION'});
                expect(state).to.have.property('value');
                expect(state).to.have.property('status');
            });

            it('should use initialState as default value and pristine as default status', () => {
                const state = reducer(undefined, {type: 'UNDEFINED_ACTION'});
                expect(state).to.deep.equal({value: initialState, status: EFieldStatus.pristine});
            });

            it('should update value and status on UPDATE_FIELD', () => {
                const action = updateField(name, 'b', EFieldStatus.invalid);
                const newState = reducer({value: 'a', status: EFieldStatus.pristine}, action);
                expect(newState).to.deep.equal({value: 'b', status: EFieldStatus.invalid});
            });

            it('should not update anything if the fieldName is not the same', () => {
                const action = updateField('anotherFieldName', 'b', EFieldStatus.invalid);
                const state = {value: 'a', status: EFieldStatus.pristine};
                expect(reducer(state, action)).to.deep.equal(state);
            });

            it('should update only status if value is null', () => {
                const action = updateField(name, 'b', null);
                const newState = reducer({value: 'a', status: EFieldStatus.valid}, action);
                expect(newState).to.deep.equal({value: 'b', status: EFieldStatus.valid});
            });

            it('should update only value if status is null', () => {
                const action = updateField(name, null, EFieldStatus.invalid);
                const newState = reducer({value: 'a', status: EFieldStatus.valid}, action);
                expect(newState).to.deep.equal({value: 'a', status: EFieldStatus.invalid});
            });
        });
    });

    describe('creating', () => {
        it('should be false by default', () => {
            const newState = creating(undefined, {type: 'UNDEFINED_ACTION'});
            expect(newState).to.be.false;
        });

        it('should set to true after START_CREATING_JOB', () => {
            expect(creating(false, startCreatingJob())).to.be.true;
            expect(creating(true, startCreatingJob())).to.be.true;
        });

        it('should set to false after FINISH_CREATING_JOB', () => {
            expect(creating(false, finishCreatingJob())).to.be.false;
            expect(creating(true, finishCreatingJob())).to.be.false;
        });
    });
});
