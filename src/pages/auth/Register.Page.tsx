import { useNavigate } from '@solidjs/router';
import { JSX } from 'solid-js';
import { createStore } from 'solid-js/store';
import { PageWithNavbar } from '~/components/PageWithNavbar';
import { Button } from '~/components/buttons/Button';
import { TextInput } from '~/components/inputs/TextInput';
import { api } from '~/config/api/API';

type RegisterForm = {
	UserName: string;
	Email: string;
	Password: string;
};

export const RegisterPage = () => {
	const navigate = useNavigate();
	const [registerForm, setRegisterForm] = createStore<RegisterForm>({
		UserName: '',
		Email: '',
		Password: '',
	});

	const onSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
		event
	) => {
		event.preventDefault();

		const res = await api().post('Auth/Register', { json: registerForm });
		await res.json();

		if (res.status !== 200) {
			window.alert('Register failed!');
		}

		navigate('/auth/login');
	};

	return (
		<PageWithNavbar centered>
			<p>Register</p>

			<form
				class='flex w-80 flex-col items-center gap-4'
				onSubmit={onSubmit}
			>
				<label for='UserName'>User Name:</label>
				<TextInput
					id='UserName'
					value={registerForm.UserName}
					onInput={(e) =>
						setRegisterForm({ ...registerForm, UserName: e.target.value })
					}
				/>

				<label for='Email'>Email:</label>
				<TextInput
					id='Email'
					value={registerForm.Email}
					onInput={(e) =>
						setRegisterForm({ ...registerForm, Email: e.target.value })
					}
				/>

				<label for='Password'>Password:</label>
				<TextInput
					id='Password'
					type='password'
					value={registerForm.Password}
					onInput={(e) =>
						setRegisterForm({ ...registerForm, Password: e.target.value })
					}
				/>

				<Button width='medium' type='submit'>
					Register
				</Button>
			</form>
		</PageWithNavbar>
	);
};
