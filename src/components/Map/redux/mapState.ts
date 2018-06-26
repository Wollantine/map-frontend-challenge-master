import {IState, mapSelector, TSelector} from '../../../redux/appState';
import {TGeocode} from '../../../api/geocode';
import {Maybe} from 'tsmonad';

export interface IMapState {
    pickupGeocode: Maybe<TGeocode>;
    dropoffGeocode: Maybe<TGeocode>;
}

export const pickupGeocodeSelector: TSelector<Maybe<TGeocode>> =
    (state: IState) => mapSelector(state).pickupGeocode;
export const dropoffGeocodeSelector: TSelector<Maybe<TGeocode>> =
    (state: IState) => mapSelector(state).dropoffGeocode;
