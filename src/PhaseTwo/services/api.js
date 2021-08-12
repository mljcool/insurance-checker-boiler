import { URL_SCRAPING } from '../constants';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

export const getMethod = (url) => {
  return fetch(URL_SCRAPING + url, {
    method: 'GET',
    headers: myHeaders,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('getMethod -error', error);
    });
};

export const postMethod = (url, dataParams = {}) => {
  return fetch(URL_SCRAPING + url, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(dataParams),
  }).then((response) => response.json());
};
