export const getHeaders = () => { // Gets common headers for api
  const headers = {
    'Content-Type': 'application/json'
  }
  return headers
}

export const getApiBase = () => { // Gets api base url
  return 'https://lldev.thespacedevs.com/2.2.0';
}

export const convertFiltersIntoQuery = (filters: string[]) => { // Converts filters array into a query string
  let filterQuery = '';
  filters.forEach((filter: string, index: number) => {
    if(index === 0) {
      filterQuery += '?' + filter;
    } else {
      filterQuery += '&' + filter;
    }
  });
  return filterQuery;
}