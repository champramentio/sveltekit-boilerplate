import api from '$lib/api';

export const get = async (request) => {
	const result = await api
		.get({
			url: `/organizer?${request.query.toString()}`,
			token: request.locals.accessToken
		})
		.catch((err) => {
			return { error: err };
		});

	return {
		body: result
	};
};
