import api from '$lib/api';
import { encodeCookie } from '$lib/utils';

export const post = async (request) => {
	const { email, password, captcha } = JSON.parse(request.body);

	const result = await api.post({
		url: '/login',
		payload: {
			email,
			password,
			captcha
		}
	});

	return {
		body: result,
		headers: {
			'set-cookie': result?.data?.auth ? encodeCookie(result.data.auth.token, result.data.auth.refreshToken, result.data.name, result.data.id) : ''
		}
	};
};
