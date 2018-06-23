import * as React from 'react';
import { GOOGLE_API_KEY } from '../../config/keys';
const {GoogleApiWrapper, Map, Marker} = require('google-maps-react');

interface IProps {
    google: any;
}

const MapContainer: React.StatelessComponent<IProps> = ({google}) => (
    <Map google={google} zoom={14}>
        <Marker name={'Current location'} />
    </Map>
);

export default GoogleApiWrapper({
    apiKey: GOOGLE_API_KEY,
})(MapContainer);
