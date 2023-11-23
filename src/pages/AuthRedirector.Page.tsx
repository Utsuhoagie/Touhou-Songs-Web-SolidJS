import { makePersisted } from '@solid-primitives/storage';
import { Outlet, useLocation, useNavigate } from '@solidjs/router';
import { createEffect, createSignal } from 'solid-js';

type SessionTokenStore = {
	token?: string;
};

export const [sessionStore, setSessionStore] = makePersisted(
	// eslint-disable-next-line solid/reactivity
	createSignal<SessionTokenStore>({ token: undefined }),
	{ storage: sessionStorage }
);

export const AuthRedirector = () => {
	const location = useLocation();
	const navigate = useNavigate();

	createEffect(() => {
		console.log({ token: sessionStore().token, location });
		const pathname = location.pathname;
		const isLoggedIn = Boolean(sessionStore().token);

		if (!isLoggedIn && !pathname.startsWith('/auth')) {
			navigate('/auth/login');
		} else if (isLoggedIn && !pathname.startsWith('/app')) {
			navigate('/app/official-games');
		}
	});

	return <Outlet />;
};
