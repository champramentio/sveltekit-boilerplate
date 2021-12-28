import api from '$lib/api';

export const get = async (request) => {
	const result = await api.get({
		url: `/organizer?${request.query.toString()}`,
		token: request.locals.accessToken
	});

	return {
		body: result
	};
};
