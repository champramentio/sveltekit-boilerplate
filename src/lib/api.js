import axios from 'axios';
import config from '$lib/config';

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({
	baseURL: config.baseURL,
	timeout: config.requestTimeout
});

// axiosAPI.interceptors.request.use(
// 	async (config) => {
// 		// 		console.log('CCC', config);
// 		// 		// const state = getting(userState);

// 		// 		// const expires = state && state.expires_at;
// 		// 		// let accessToken = state && state.access_token;
// 		// 		// const refreshToken = state && state.refresh_token;

// 		// 		// if (accessToken) {
// 		// 		// 	//check expired token
// 		// 		// 	if (expires - Date.now() / 1000 < 60) {
// 		// 		// 		try {
// 		// 		// 			const result = await axios({
// 		// 		// 				url: `${variables.basePath}/refresh_token`,
// 		// 		// 				method: 'POST',
// 		// 		// 				data: {
// 		// 		// 					refresh_token: refreshToken
// 		// 		// 				}
// 		// 		// 			})
// 		// 		// 				.then((res) => {
// 		// 		// 					return Promise.resolve(res.data);
// 		// 		// 				})
// 		// 		// 				.catch((err) => {
// 		// 		// 					return Promise.reject(err);
// 		// 		// 				});

// 		// 		// 			if (result.data.error) window.location('/login');

// 		// 		// 			//set new data to the store
// 		// 		// 			userState.set({ ...result.data, athelete: state.athlete });

// 		// 		// 			//overwrite new access token
// 		// 		// 			accessToken = result.data.access_token;
// 		// 		// 		} catch (_error) {
// 		// 		// 			return Promise.reject(_error);
// 		// 		// 		}
// 		// 		// 	}
// 		// 		// }

// 		// 		// //return config;
// 		// 		// config.headers['authorization'] = `Bearer ${accessToken}`;

// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

//implement a method to execute all the request from here.
const apiRequest = ({ method, url, payload, token }) => {
	return axiosAPI({
		method,
		url,
		data: payload,
		headers: token
			? {
					Authorization: `Bearer ${token}`
			  }
			: ''
	})
		.then((res) => {
			return Promise.resolve(res.data);
		})
		.catch((err) => {
			return Promise.reject(err);
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
