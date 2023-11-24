import { jwtDecode } from 'jwt-decode';
import { sessionStore } from '~/pages/AuthRedirector.Page';

type JwtRawClaims = {
	exp: number;
	'http://schemas.microsoft.com/ws/2008/06/identity/claims/role':
		| 'Admin'
		| 'User';
};

type JwtClaims = {
	exp: Date;
	role: 'Admin' | 'User';
};

export const AuthUtils = {
	isLoggedIn() {
		return Boolean(sessionStore().token);
	},

	isAdmin() {
		const token = sessionStore().token;

		if (!token) {
			return false;
		}

		const jwt = parseJwt(token);
		return jwt.role === 'Admin';
	},
};

function parseJwt(token: string): JwtClaims {
	const raw = jwtDecode<JwtRawClaims>(token);

	return {
		exp: new Date(raw.exp * 1000),
		role: raw['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
	};
}
