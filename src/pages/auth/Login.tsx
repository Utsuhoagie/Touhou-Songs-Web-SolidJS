import { JSX } from 'solid-js';
import { createStore } from 'solid-js/store';
import { PageWithNavbar } from '~/components/PageWithNavbar';
import { api } from '~/config/api/API';
import { sessionStore, setSessionStore } from '~/pages/AuthRedirector.Page';

type LoginForm = {
	Email: string;
	Password: string;
};

type LoginResponse = {
	Token: string;
	ExpiresAt: Date;
};

export const Login = () => {
	const [loginForm, setLoginForm] = createStore<LoginForm>({
		Email: '',
		Password: '',
	});

	const onSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
		event
	) => {
		console.log('--- Login onSubmit');
		event.preventDefault();

		const res = await api().post('Auth/Login', { json: loginForm });
		const json: LoginResponse = await res.json();

		if (res.status !== 200) {
			window.alert('Login failed!');
		}

		console.log('--- Login before set token');
		setSessionStore({ token: json.Token });
		console.log('--- Login after set token');

		console.log('--- Login res =', res);
	};

	return (
		<PageWithNavbar centered>
			<p>Login</p>

			<form
				class='flex w-80 flex-col items-center gap-4'
				onSubmit={onSubmit}
			>
				<label for='Email'>Email:</label>
				<input
					id='Email'
					name='Email'
					value={loginForm.Email}
					onInput={(e) =>
						setLoginForm({ ...loginForm, Email: e.target.value })
					}
				/>

				<label for='Password'>Password:</label>
				<input
					id='Password'
					name='Password'
					type='password'
					value={loginForm.Password}
					onInput={(e) =>
						setLoginForm({ ...loginForm, Password: e.target.value })
					}
				/>

				<button>Log In</button>

				<p class='w-40'>Token? {sessionStore().token ?? 'None'}</p>
			</form>
		</PageWithNavbar>
	);
};
