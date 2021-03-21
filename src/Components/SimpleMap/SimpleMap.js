import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 23.810331,
  lng: 90.412521
};

function SimpleMap() {
    
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyC7nqYnq4yGO_c2JPO0GE9lerURqEGCz7Y"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(SimpleMap)