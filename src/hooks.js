import { decodeCookie } from '$lib/utils';

export async function handle({ request, resolve }) {
	const { accessToken, refreshToken } = decodeCookie(request.headers.cookie || '');

	request.locals.accessToken = accessToken;
	request.locals.refreshToken = refreshToken;

	const response = await resolve(request);

	// console.log('dari handle:', request.locals);

	return response;
}

export function getSession(request) {
	const { name } = decodeCookie(request.headers.cookie || '');

	// console.log('dari getsession:', name);
	return { name };
}
