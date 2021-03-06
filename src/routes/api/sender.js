import api from '$lib/api';

export const get = async (request) => {
	const result = await api
		.get({
			url: '/sender',
			token: request.locals.accessToken
		})
		.catch((error) => error);

	return {
		body: result
	};
};
