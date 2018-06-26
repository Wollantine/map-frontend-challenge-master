import { combineReducers } from "redux";
import { reduceWhen, actionHasField } from "../../../redux/genericReducers";
import { TAction } from "../../../redux/appReducer";
import { UPDATE_GEOCODE, UPDATE_FIELD } from "../../JobForm/redux/jobFormActions";
import { TGeocode } from "../../../api/geocode";
import {Maybe} from 'tsmonad';

const initialState: Maybe<TGeocode> = Maybe.nothing();

const geocode = (state: Maybe<TGeocode> = initialState, action: TAction): Maybe<TGeocode> => {
    switch (action.type) {
        case UPDATE_GEOCODE:
            return Maybe.just(action.geocode);
        case UPDATE_FIELD:
            return initialState;
        default:
            return state;
    }
}

export const mapReducer = combineReducers({
    pickupGeocode: reduceWhen(actionHasField('pickup'), geocode, initialState),
    dropoffGeocode: reduceWhen(actionHasField('dropoff'), geocode, initialState),
});
