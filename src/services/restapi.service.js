import { authHeader } from '../helpers/auth-header';
import { config } from '../helpers/config';
import { globalService } from './global.service';
const restApiService = {
    getAsync: async(url) => {   
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader() }
        };
        return await fetch(config.apiUrl+url, requestOptions).then(globalService.handleResponse, globalService.handleError);
    },
    postAsync: async(url, params) => {
        const requestOptions = {
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        };
        return await fetch(config.apiUrl+url, requestOptions).then(globalService.handleResponse, globalService.handleError);
    }


};
export default restApiService;


