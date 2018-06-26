import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../redux/appState';
import { Maybe } from 'tsmonad';
import { TGeocode } from '../../api/geocode';
import { pickupGeocodeSelector, dropoffGeocodeSelector } from './redux/MapState';
import MapView, { IMarker, IMarkerIcon, IPosition } from './MapView';
import * as R from 'ramda';
const pickupMarkerIcon = require('../../../assets/pickUpMarker.svg');
const dropoffMarkerIcon = require('../../../assets/dropOffMarker.svg');


interface IStateProps {
    pickupGeocode: Maybe<TGeocode>;
    dropoffGeocode: Maybe<TGeocode>;
}

const pickupIcon = {url: pickupMarkerIcon, anchor: null, scaledSize: null};
const dropoffIcon = {url: dropoffMarkerIcon, anchor: null, scaledSize: null};

const MapContainer: React.StatelessComponent<IStateProps> = ({pickupGeocode, dropoffGeocode}) => {
    const allMarkers = [
        pickupGeocode.caseOf({
            nothing: () => null,
            just: R.curry(geocodeToGoogleMarker)(pickupIcon),
        }),
        dropoffGeocode.caseOf({
            nothing: () => null,
            just: R.curry(geocodeToGoogleMarker)(dropoffIcon),
        }),
    ];
    const markers = R.reject(R.isNil, allMarkers);
    const positions: IPosition[] = R.map(R.prop('position'), markers);
    const center = centerOfPositions(positions).valueOr(undefined as any);
    return (
        <MapView markers={markers} center={center}/>
    );
};

function geocodeToGoogleMarker(icon: IMarkerIcon, geocode: TGeocode): IMarker {
    return {
        name: geocode.address,
        position: {lat: geocode.latitude, lng: geocode.longitude},
        icon,
    };
}

function centerOfPositions(positions: IPosition[]): Maybe<IPosition> {
    // TODO: compute boundingBox of positions and return its center
    return Maybe.maybe(R.head(positions));
}

const mapStateToProps = (state: IState) => ({
    pickupGeocode: pickupGeocodeSelector(state),
    dropoffGeocode: dropoffGeocodeSelector(state),
});

export default connect(mapStateToProps)(MapContainer);
