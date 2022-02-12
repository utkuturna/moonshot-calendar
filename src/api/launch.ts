import {getApiBase, getHeaders} from "./utils";

export const getLaunches = async () => {
  const url = getApiBase() + '/launch';
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