import React, {useCallback, useEffect} from 'react';
import {getLaunches} from "../api/launch";

const Home: React.FC = () => {


  const fetchLaunches = useCallback(() => {
    getLaunches().then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  return (
    <div>
      HOME PAGE
    </div>
  )
}

export default Home;