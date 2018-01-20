import queryString from 'query-string';

import config from '../config';
import constants from '../constants';
import http from '../httpUtils/http';

const { endpoints } = config.api;

export async function search(q) {
  let params = {
    q,
    key: constants.apiKey,
    part: constants.snippet
  }
  const query = queryString.stringify(params);
  const url = `${endpoints.search}/?${query}`;
  const { data } = await http.get(url);

  return data;
}
