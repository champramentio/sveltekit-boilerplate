import api from '$lib/api';
import { removeCookie } from '$lib/utils';

export const post = async (request) => {
	const result = await api.post({
		url: '/logout',
		token: request.locals.accessToken,
		payload: {
			refresh_token: request.locals.refreshToken
		}
	});

	return {
		body: result,
		headers: {
			'Set-Cookie': removeCookie()
		}
	};
};
