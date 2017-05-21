import React from 'react';
import { withGoogleMap, GoogleMap, InfoWindow, Marker } from "react-google-maps";

const ComboMap = withGoogleMap(props => (
  <GoogleMap defaultZoom={13} center={props.center} >
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        position={marker.markerstate.position}
        onClick={() => props.onMarkerClick(marker)}
      >
        {marker.markerstate.showInfo && (
          <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
            <div>{marker.markerstate.infoContent}</div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));

export default ComboMap;



