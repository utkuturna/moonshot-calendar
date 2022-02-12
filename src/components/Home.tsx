import React, {useCallback, useEffect, useState} from 'react';
import {getLaunches, getLaunchesWithUrl} from "../api/launch";
import Loading from "./Loading";
import Globe from "./Globe";
import Filter from "./Filter";

const now = new Date(); // Get the time for now
now.setMonth(now.getMonth() - 3); // Calculate three months ago

const INITIAL_FILTERS = [
  'window_start__gt=' + now.toISOString()
]

const Home: React.FC = () => {
  const [filters, setFilters] = useState<any>(INITIAL_FILTERS);
  const [launches, setLaunches] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchNextLaunches = useCallback((next: string) => { // Fetch next results with url
    getLaunchesWithUrl(next).then( res => {
      if(res.next) {
        setLaunches((state: any) => {
          return [...state, ...res.results]
        })
        fetchNextLaunches(res.next);
      } else {
        setIsLoading(false);
      }
    }).catch( err => {
      console.log(err);
    })
  }, []);

  const fetchLaunches = useCallback(() => { // Fetch initial values with filters
    setIsLoading(true);
    getLaunches(filters).then(res => {
      if(res.next) {
        fetchNextLaunches(res.next)
      }
      setLaunches((state: any) => {
        return [...state, ...res.results]
      })
    }).catch(err => {
      console.log(err);
    })
  }, [fetchNextLaunches, filters]);



  useEffect(() => {
    setLaunches([]);
    fetchLaunches();
  }, [fetchLaunches]);

  return (
    <div>
      {
        isLoading && <Loading />
      }
      {
        !isLoading &&
        <>
          {/*{launches.map((launch: any) => {
            return (
              <div key={launch.id}>{launch.name}</div>
            )
          })}*/}
          <Globe launches={launches} />
          <Filter />
        </>
       }
    </div>
  )
}

export default Home;