import React from 'react';
import { GoogleMap, useJsApiLoader,Marker } from '@react-google-maps/api';
const containerStyle = {
  width: '720px',
  height: '400px',
};

interface Props {
  children: JSX.Element;
  center:{
    lat:number,
    lng:number
  },
}

export default function GoogleMaps(props: Props) {
  const center = {
    lat: props.center.lat,
    lng: props.center.lng,
  };
  const { isLoaded } = useJsApiLoader({
    id: 'Decido',
    googleMapsApiKey: '',
  });
  const [map, setMap] = React.useState<any>(null);

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {props.children}
    </GoogleMap>
  ) : (
    <></>
  );
}
