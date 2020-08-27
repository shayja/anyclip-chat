import authHeader from '../helpers/auth-header';
import globalService from './global.service';

const restApiService = {
  getAsync: async (url) => {
    const requestOptions = {
      method: 'GET',
      headers: { ...authHeader() },
    };
    return fetch(process.env.REACT_APP_API_BASE_URL + url, requestOptions)
      .then(globalService.handleResponse, globalService.handleError);
  },
  postAsync: async (url, params) => {
    const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    };
    return fetch(process.env.REACT_APP_API_BASE_URL + url, requestOptions)
      .then(globalService.handleResponse, globalService.handleError);
  },
};
export default restApiService;
