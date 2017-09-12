/**
 * Created by alexandermann on 2017-04-03.
 */
import 'isomorphic-fetch';
import assert from 'assert';

const ADMIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJraW5kIjoic2NhcGhvbGQuc3VwZXJ1c2VyIiwiZXhwIjo4NjQwMDAwMDAwMDAwMDAwLCJpYXQiOjE0OTE4NDI3NTMsImF1ZCI6Ikp0Z2Z5WklRMnBKajlySThFOWU2MTdoUWNrMFJueEFuIiwiaXNzIjoiaHR0cHM6Ly9zY2FwaG9sZC5hdXRoMC5jb20vIiwic3ViIjoiMjdlZmU5MDAtMzNkOS00ZjQ3LThlMmQtZGJlZGY4NTA0ZjZmIn0.d3u0P0qTyd4LhSnETR3guDGLKPMhV7cpjTmGHe_hCyI';
const SCAPHOLD_URL = 'https://us-west-2.api.scaphold.io/graphql/toktumi';

/**
 * create a graphql-fetch bound to a specific graphql url
 * @param  {String} graphqlUrl
 * @return {Function} graphqlFetch
 */
function graphqlFetch(graphqlUrl) {
  /**
   * graphql fetch - fetch w/ smart defaults for graphql requests
   * @param  {Query} query graphql query
   * @param  {Object} vars  graphql query args
   * @param  {Object} opts  fetch options
   * @return {FetchPromise} fetch promise
   */
  return async (query, vars, opts) => {
    assert(query, 'query is required');
    vars = vars || {};
    opts = opts || {};
    opts.method = 'POST';
    opts.headers = {
      Authorization: `Bearer ${ADMIN_TOKEN}`,
      'content-type': 'application/json',
    };
    opts.body = JSON.stringify({
      query,
      variables: vars,
    });

    let res = await fetch(graphqlUrl, opts);
    res = await res.json();
    if (res.errors) throw new Error(res);
    return res;
  };
}

export default graphqlFetch(SCAPHOLD_URL);
