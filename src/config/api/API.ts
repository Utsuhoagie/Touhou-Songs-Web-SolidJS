import { Params } from '@solidjs/router';
import ky from 'ky';

export const api = ky.create({ prefixUrl: `https://localhost:5000/api` });

export function createQueryString(params: object | Params): string {
	const jsonParams = { ...params };
	const queryString = new URLSearchParams(jsonParams).toString();
	const isEmpty = queryString === '';

	return isEmpty ? '' : `?${queryString}`;
}
