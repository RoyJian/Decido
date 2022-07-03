import React from 'react';
import { GoogleMap, useJsApiLoader,Marker } from '@react-google-maps/api';
const containerStyle = {
  width: '720px',
  height: '400px',
};
interface Props {
  children: JSX.Element | JSX.Element [] ;
  center?:{
    lat:number,
    lng:number
  },
  width?:string,
  height?:string
}

export default function GoogleMaps(props: Props) {
  const containerStyle = {
    width: props.width||'720px',
    height: props.height||'400px',
  };
  const { isLoaded } = useJsApiLoader({
    id: 'Decido',
    googleMapsApiKey: '',
  });
  const [map, setMap] = React.useState<any>(null);

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds();
    if (props.center?.lat !== undefined){
      const center = props.center as unknown as google.maps.LatLng;
      bounds.extend(center);
    }
    else{
      Array.from(props.children as JSX.Element []).forEach((element)=> {
        bounds.extend(element.props.position);
      });
    }
    map.fitBounds(bounds);
    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {props.children}
    </GoogleMap>
  ) : (
    <></>
  );
}
