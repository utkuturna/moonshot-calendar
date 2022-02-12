import React, {useCallback, useEffect, useState} from "react";
import ReactGlobe, {Marker} from 'react-globe';

const options: any = {
  cameraRotateSpeed: 0.5,
  focusAnimationDuration: 2000,
  focusEasingFunction: ['Linear', 'None'],
  markerTooltipRenderer: (marker: Marker) => `${marker.name}`,
};

const Globe: React.FC<any> = (props) => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  const setMarkersFromLaunches = useCallback(() => {
    props.launches.forEach((launch: any) => {
      let color = 'gold';
      if(launch.status.id === 3) {
        color = 'green';
      } else if (launch.status.id === 4) {
        color = 'red';
      }
      if(launch.pad.latitude && launch.pad.longitude) {
        const marker: Marker = {
          id: launch.id,
          name: launch.name,
          color: color,
          coordinates: [launch.pad.latitude, launch.pad.longitude],
          value: 50,
        };
        setMarkers( state => {
          return [...state, ...[marker]]
        })
      }
    });
  }, [props.launches]);

  useEffect(() => {
    setMarkersFromLaunches();
  }, [setMarkersFromLaunches]);

  return (
    <ReactGlobe
      height="100vh"
      width="100%"
      markers={markers}
      options={options}
    />
  )
}

export default Globe;