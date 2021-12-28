import axios from 'axios';
import config from '$lib/config';

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({
	baseURL: config.baseURL,
	timeout: config.requestTimeout
});

//implement a method to execute all the request from here.
const apiRequest = ({ method, url, payload, token }) => {
	return axiosAPI({
		method,
		url,
		data: payload,
		headers: token ? { Authorization: `Bearer ${token}` } : ''
	})
		.then((res) => {
			return Promise.resolve(res.data);
		})
		.catch((err) => {
			return Promise.reject(err.message);
		});
};

//function to execute the http get request
const get = ({ url, token }) => apiRequest({ method: 'get', url, token });

//function to execute the http delete request
const del = ({ url, payload, token }) => apiRequest({ method: 'delete', url, payload, token });

//function to execute the http post request
const post = ({ url, payload, token }) => apiRequest({ method: 'post', url, payload, token });

//function to execute the http put request
const put = ({ url, payload, token }) => apiRequest({ method: 'put', url, payload, token });

//function to execute the http path request
const patch = ({ url, payload, token }) => apiRequest({ method: 'patch', url, payload, token });

//expose your method to other services or actions
const api = {
	get,
	del,
	post,
	put,
	patch
};
export default api;
