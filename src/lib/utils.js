import * as cookie from 'cookie';
import jwt_decode from 'jwt-decode';
import config from '$lib/config';
import dayjs from 'dayjs';
dayjs().format();

const AUTH_COOKIE_NAME = 'artkie';

export function encodeCookie(token, refreshToken, name) {
	//get access token expired timestamp
	const { exp: expiredTimestamp } = jwt_decode(token);

	//format cookie
	const formatted = `${token}|${refreshToken}|${name}`;

	//setup cookie options
	return cookie.serialize(AUTH_COOKIE_NAME, formatted, {
		httpOnly: true,
		maxAge: new Date(expiredTimestamp),
		sameSite: 'strict',
		secure: config.deployMode === 'production',
		path: '/'
	});
}

export function removeCookie() {
	//setup cookie options
	return cookie.serialize(AUTH_COOKIE_NAME, '', {
		httpOnly: true,
		maxAge: 0,
		sameSite: 'strict',
		secure: config.deployMode === 'production',
		path: '/'
	});
}

export function decodeCookie(allCookies) {
	const parsed = cookie.parse(allCookies);
	const [accessToken, refreshToken, name] = parsed[AUTH_COOKIE_NAME] ? parsed[AUTH_COOKIE_NAME].split('|') : [];

	return { accessToken, refreshToken, name };
}

export function titleCase(str) {
	return str
		.split(' ')
		.map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
		.join(' ');
}

export function createArrayOfNumbers(n) {
	return [...Array(n)].map((_, i) => i + 1); //contoh n = 10 maka hasilnya [1,2,3,4,...,10]
}

export function checkObjectLength(obj) {
	//{} => return 0
	//{test:'a', demo: 'b'} => return 2
	return Object.entries(obj).length;
}

export function formatAmount(amount, currency = true) {
	if (currency) {
		const formatter = new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR'
		});
		if (amount === null) return '-';
		return formatter.format(amount).replace(/.00$/, '').replace(/,/g, '.');
	} else {
		return amount ? amount.toLocaleString('id-ID') : amount;
	}
}

export function formatDatetime(datetime) {
	return datetime ? dayjs(datetime).format('YYYY-MM-DD HH:mm:ss') : '-';
}

export function formatDate(datetime) {
	return datetime ? dayjs(datetime).format('YYYY-MM-DD') : '-';
}

export function currentDate(days) {
	return days ? dayjs().add(days, 'day').format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
}

export function addAndFormatDate(arg1, arg2) {
	return dayjs().add(arg1, arg2).format('YYYY-MM-DD');
}

export function addAndFormatDatetime(arg1, arg2) {
	return dayjs().add(arg1, arg2).format('YYYY-MM-DD HH:mm:ss');
}

export function displayStatus(status_name) {
	if (['rejected', 'canceled', 'void', 'unverified', 'inactive', 'expired', 'failed'].includes(status_name)) return `<span class="tag is-danger">${status_name}</span>`;
	else if (['approved', 'completed', 'active', 'verified', 'valid', 'issued'].includes(status_name)) return `<span class="tag is-success">${status_name}</span>`;
	else if (['needaction'].includes(status_name)) return `<span class="tag" style="color:white;background-color:orange;padding:6px">${status_name}</span>`;
	else return `<span class="tag">${status_name}</span>`;
}

export function tableNumbering(index, current_page) {
	return (current_page - 1) * 15 + parseInt(index) + 1;
}
