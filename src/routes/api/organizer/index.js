import api from '$lib/api';

export const get = async (request) => {
	const result = await api
		.get({
			url: `/organizer?${request.query.toString()}`,
			token: request.locals.accessToken
		})
		.catch((error) => error);

	return {
		body: result
	};
};

export const post = async (request) => {
	const { organizer_name, organizer_email, organizer_phone1, organizer_address, organizer_zip, ms_city_id, user_id, company_id, organizer_logo } = JSON.parse(request.body);

	const result = await api
		.post({
			url: `/organizer`,
			token: request.locals.accessToken,
			payload: {
				organizer_name,
				organizer_email,
				organizer_phone1,
				organizer_address,
				organizer_zip,
				ms_city_id,
				user_id: request.locals.id,
				company_id,
				organizer_logo
			}
		})
		.catch((error) => error);

	return {
		body: result
	};
};
