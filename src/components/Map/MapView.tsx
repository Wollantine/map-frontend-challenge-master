import * as React from 'react';
import { GOOGLE_API_KEY } from '../../config/keys';
const {GoogleApiWrapper, Map, Marker} = require('google-maps-react');

export interface IMarkerIcon {
    url: string;
    anchor: any;
    scaledSize: any;
}

export interface IPosition {
    lat: number;
    lng: number;
}

export interface IMarker {
    name: string;
    position: IPosition;
    icon: IMarkerIcon;
}

export interface IProps {
    google: any;
    markers: IMarker[];
    center?: IPosition;
}

const MapView: React.StatelessComponent<IProps> = ({google, markers, center}) => (
    <Map google={google} zoom={14} center={center}>
        {markers.map(marker => (
            <Marker key={marker.name} name={marker.name} position={marker.position} icon={marker.icon}/>
        ))}
    </Map>
);

export default GoogleApiWrapper({
    apiKey: GOOGLE_API_KEY,
})(MapView);
