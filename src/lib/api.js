import axios from 'axios';
import config from '$lib/config';

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({
	baseURL: config.baseURL,
	timeout: config.requestTimeout
});

//implement a method to execute all the request from here.
const apiRequest = ({ method, url, payload, token, type = 'json' }) => {
	return axiosAPI({
		method,
		url,
		data: payload,
		headers: token ? { Authorization: `Bearer ${token}` } : '',
		responseType: type
	})
		.then((res) => res.data)
		.catch((err) => err.message);
};

//function to execute the http get request
const get = ({ url, token, type }) => apiRequest({ method: 'get', url, token, type });

//function to execute the http delete request
const del = ({ url, payload, token, type }) => apiRequest({ method: 'delete', url, payload, token, type });

//function to execute the http post request
const post = ({ url, payload, token, type }) => apiRequest({ method: 'post', url, payload, token, type });

//function to execute the http put request
const put = ({ url, payload, token, type }) => apiRequest({ method: 'put', url, payload, token, type });

//function to execute the http path request
const patch = ({ url, payload, token, type }) => apiRequest({ method: 'patch', url, payload, token, type });

//expose your method to other services or actions
const api = {
	get,
	del,
	post,
	put,
	patch
};
export default api;
