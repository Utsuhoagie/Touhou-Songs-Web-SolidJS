import { JSX } from 'solid-js/h/jsx-runtime';
import { createStore } from 'solid-js/store';
import { PageWithNavbar } from '~/components/PageWithNavbar';
import { Button } from '~/components/buttons/Button';
import { TextInput } from '~/components/inputs/TextInput';
import { api } from '~/config/api/API';

type CreateCircleForm = {
	Name: string;
};

export const CreateCirclePage = () => {
	const [createCircleForm, setCreateCircleForm] =
		createStore<CreateCircleForm>({ Name: '' });

	const onSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
		event
	) => {
		event.preventDefault();

		const res = await api().post('Circles', { json: createCircleForm });

		return await res.json();
	};

	return (
		<PageWithNavbar centered>
			<form onSubmit={onSubmit}>
				<div class='flex flex-row gap-2'>
					<label for='Name'>Circle Name:</label>
					<TextInput
						id='Name'
						value={createCircleForm.Name}
						onInput={(e) =>
							setCreateCircleForm({
								...createCircleForm,
								Name: e.target.value,
							})
						}
					/>
				</div>

				<Button type='submit' width='medium'>
					Create Circle
				</Button>
			</form>
		</PageWithNavbar>
	);
};
