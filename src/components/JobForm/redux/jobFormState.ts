import {IState, jobFormSelector} from '../../../redux/appState';
import { TField, EFieldStatus } from './field';


export interface IJobFormState {
    pickup: TField<string>;
    dropoff: TField<string>;
    creating: boolean;
}

export const emptyField = <T>(value: T) => ({value, status: EFieldStatus.pristine});

export const pickupSelector = (state: IState) => jobFormSelector(state).pickup;
export const dropoffSelector = (state: IState) => jobFormSelector(state).dropoff;
export const creatingSelector = (state: IState) => jobFormSelector(state).creating;
