import api from '$lib/api';

export const get = async (request) => {
	console.log('SSSS', request.params.id);
	const result = await api
		.get({
			url: `/organizer/${request.params.id}`,
			token: request.locals.accessToken
		})
		.catch((err) => {
			return { error: err };
		});

	return {
		body: result
	};
};
