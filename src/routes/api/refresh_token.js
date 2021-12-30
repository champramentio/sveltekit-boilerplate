import api from '$lib/api';
import { encodeCookie } from '$lib/utils';

export const post = async (request) => {
	const result = await api
		.post({
			url: '/refresh_token',
			token: request.locals.accessToken,
			payload: {
				refresh_token: request.locals.refreshToken
			}
		})
		.catch((error) => error);

	return {
		body: result,
		headers: {
			'set-cookie': result?.data?.auth ? encodeCookie(result.data.auth.token, result.data.auth.refreshToken, request.locals.name) : ''
		}
	};
};
