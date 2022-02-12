import {convertFiltersIntoQuery, getApiBase, getHeaders} from "./utils";

export const getLaunches = async (filters: string[]) => {
  const url = getApiBase() + '/launch' + convertFiltersIntoQuery(filters);
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders()
  });
  const data = await response.json();
  if(!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export const getLaunchesWithUrl = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders()
  });
  const data = await response.json();
  if(!response.ok) {
    throw new Error(data.message);
  }
  return data;
}