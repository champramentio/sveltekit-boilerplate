import api from '$lib/api';

export const get = async (request) => {
	const result = await api
		.get({
			url: `/organizer/${request.params.id}/logo`,
			token: request.locals.accessToken,
			type: 'arraybuffer'
		})
		.catch((error) => error);

	return {
		body: result
	};
};
