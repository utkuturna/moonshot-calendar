import React, {useCallback, useEffect, useState} from "react";
import ReactGlobe, {Marker} from 'react-globe';
import Launch from "../models/Launch";

const options: any = {
  cameraRotateSpeed: 0.5,
  focusAnimationDuration: 2000,
  focusEasingFunction: ['Linear', 'None'],
  markerTooltipRenderer: (marker: Marker) => `${marker.name}`,
};

const Globe: React.FC<any> = (props) => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  const setMarkersFromLaunches = useCallback(() => {
    props.launches.forEach((launch: Launch) => {
      if(launch.pad.latitude && launch.pad.longitude) {
        const marker = createMarkerFromLaunch(launch);
        setMarkers( state => {
          return [...state, ...[marker]]
        })
      }
    });
  }, [props.launches]);

  const createMarkerFromLaunch = (launch: Launch): Marker => {
    let color = 'gold';
    if(launch.status.id === 3) {
      color = 'green';
    } else if (launch.status.id === 4) {
      color = 'red';
    }
    return {
      id: launch.id.toString(),
      name: launch.name,
      color: color,
      coordinates: [parseInt(launch.pad.latitude), parseInt(launch.pad.longitude)],
      value: 50,
    }
  }

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