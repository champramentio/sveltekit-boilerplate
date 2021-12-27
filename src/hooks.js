import { encodeCookie, decodeCookie } from '$lib/utils';
import jwt_decode from 'jwt-decode';
import api from '$lib/api';

export async function handle({ request, resolve }) {
	const { accessToken, refreshToken, name } = decodeCookie(request.headers.cookie || '');

	request.locals.accessToken = accessToken;
	request.locals.refreshToken = refreshToken;
	request.locals.name = name;

	const response = await resolve(request);

	//validasi refresh token
	if (accessToken) {
		const { exp } = jwt_decode(accessToken);

		//jika sudah mau expired
		if (exp - Date.now() / 1000 < 60) {
			//refresh token yang baru
			const result = await api.post({
				url: '/refresh_token',
				token: request.locals.accessToken,
				payload: {
					refresh_token: request.locals.refreshToken
				}
			});

			return {
				...response,
				headers: {
					'set-cookie': result?.data ? encodeCookie(result.data.token, result.data.refreshToken, request.locals.name) : ''
				}
			};
		}
	}

	console.log('dari handle:', request.locals);

	return response;
}

export function getSession(request) {
	const { name } = decodeCookie(request.headers.cookie || '');

	// console.log('dari getsession:', name);
	return { name };
}
