import { Params } from '@solidjs/router';
import ky from 'ky';
import { sessionStore } from '~/pages/AuthRedirector.Page';

export const api = () =>
	ky.create({
		prefixUrl: `https://localhost:5000/api`,
		headers: {
			Authorization: (() => `Bearer ${sessionStore().token}`)(),
		},
	});

export function createQueryString(params: object | Params): string {
	const jsonParams = { ...params };
	const queryString = new URLSearchParams(jsonParams).toString();
	const isEmpty = queryString === '';

	return isEmpty ? '' : `?${queryString}`;
}
