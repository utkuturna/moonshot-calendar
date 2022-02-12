import React, {useCallback, useEffect, useState} from 'react';
import {getLaunches, getLaunchesWithUrl} from "../api/launch";
import Loading from "./Loading";
import Globe from "./Globe";
import Filter from "./Filter";
import Launch from "../models/Launch";

const now = new Date(); // Get the time for now
now.setMonth(now.getMonth() - 3); // Calculate three months ago

const INITIAL_FILTERS = [
  'window_start__gt=' + now.toISOString()
]

const Home: React.FC = () => {
  const [filters, setFilters] = useState<string[]>(INITIAL_FILTERS);
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [noResult, setNoResult] = useState<boolean>(false);

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
      alert(err);
    })
  }, []);

  const fetchLaunches = useCallback(() => { // Fetch initial values with filters
    setIsLoading(true);
    getLaunches(filters).then(res => {
      if(res.next) {
        setNoResult(false);
        fetchNextLaunches(res.next);
      } else {
        setIsLoading(false);
        setNoResult(false);
      }
      if(!res.count) {
        setNoResult(true);
        setIsLoading(false);
      }
      setLaunches((state: any) => {
        return [...state, ...res.results]
      })
    }).catch(err => {
      alert(err);
    })
  }, [fetchNextLaunches, filters]);

  const handleSetFilters = (filters: any): void => {
    setFilters((state: any) => {
      return [...filters];
    })
  }

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
        !isLoading && noResult &&
        <>
          <p>No result for this filter try another</p>
          <Filter setFilters={(filters: any) => handleSetFilters(filters)} />
        </>
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
          <Filter setFilters={(filters: any) => handleSetFilters(filters)} />
        </>
       }
    </div>
  )
}

export default Home;