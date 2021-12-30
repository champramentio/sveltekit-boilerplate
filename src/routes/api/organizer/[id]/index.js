import api from '$lib/api';

export const get = async (request) => {
	const result = await api
		.get({
			url: `/organizer/${request.params.id}`,
			token: request.locals.accessToken
		})
		.catch((error) => error);

	return {
		body: result
	};
};
