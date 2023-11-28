import { useNavigate } from '@solidjs/router';
import { Show, createResource } from 'solid-js';
import { JSX } from 'solid-js/h/jsx-runtime';
import { createStore } from 'solid-js/store';
import { PageWithNavbar } from '~/components/PageWithNavbar';
import { Button } from '~/components/buttons/Button';
import {
	MultiSelectInput,
	SingleSelectInput,
} from '~/components/inputs/SelectInput';
import { TextInput } from '~/components/inputs/TextInput';
import { api } from '~/config/api/API';
import { UnofficialStatus } from '~/shared/UnofficialStatus.Type';

type CreateArrangementSongForm = {
	Title: string;
	Url: string;

	CircleName: string;
	OfficialSongIds: (number | '')[];
};

export const CreateArrangementSongPage = () => {
	const navigate = useNavigate();

	const [createArrangementSongForm, setCreateArrangementSongForm] =
		createStore<CreateArrangementSongForm>({
			Title: '',
			Url: '',
			CircleName: '',
			OfficialSongIds: [],
		});

	const [circlesResource] = createResource(async () => {
		const res = await api().get('Circles');
		return (await res.json()) as {
			Id: number;
			Name: string;
			Status: UnofficialStatus;

			ArrangementSongTitles: string[];
		}[];
	});

	const [officialSongsResource] = createResource(async () => {
		const res = await api().get('OfficialSongs');
		return (await res.json()) as {
			Id: number;
			Title: string;
			Context: string;

			GameCode: string;
		}[];
	});

	const onSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
		event
	) => {
		event.preventDefault();

		const _res = await api().post('ArrangementSongs', {
			json: createArrangementSongForm,
		});

		navigate('/app/arrangement-songs');
	};

	return (
		<PageWithNavbar centered>
			<Show
				when={circlesResource() && officialSongsResource()}
				fallback={<p>Loading circles & official songs...</p>}
			>
				<form onSubmit={onSubmit}>
					<div class='flex flex-row gap-2'>
						<label for='Title'>Title:</label>
						<TextInput
							id='Title'
							value={createArrangementSongForm.Title}
							onInput={(e) =>
								setCreateArrangementSongForm({
									...createArrangementSongForm,
									Title: e.target.value,
								})
							}
						/>
					</div>

					<div class='flex flex-row gap-2'>
						<label for='Url'>Video URL:</label>
						<TextInput
							id='Url'
							value={createArrangementSongForm.Url}
							onInput={(e) =>
								setCreateArrangementSongForm({
									...createArrangementSongForm,
									Url: e.target.value,
								})
							}
						/>
					</div>

					<div class='flex flex-row gap-2'>
						<label for='CircleName'>Circle:</label>
						<SingleSelectInput
							id='CircleName'
							value={createArrangementSongForm.CircleName}
							onChange={(e) =>
								setCreateArrangementSongForm({
									...createArrangementSongForm,
									CircleName: e.target.value,
								})
							}
							options={[
								{
									value: '',
									label: 'None...',
								},
								...circlesResource()!.map((circle) => ({
									value: circle.Name,
									label: circle.Name,
								})),
							]}
						/>
					</div>

					<div class='flex flex-row gap-2'>
						<Show
							when={officialSongsResource()}
							fallback={<p>Loading Official Songs...</p>}
						>
							<label for='search'>Search for Official Songs:</label>
							<MultiSelectInput
								options={officialSongsResource()!.map(
									(officialSong) => ({
										value: officialSong.Id,
										label: officialSong.Title,
									})
								)}
								searchBy='label'
								setter={(selectedValues) =>
									setCreateArrangementSongForm('OfficialSongIds', () =>
										selectedValues.map((value) =>
											typeof value === 'string' ? '' : value
										)
									)
								}
							/>
						</Show>
					</div>

					<Button type='submit' width='medium'>
						Create Arrangement
					</Button>
				</form>
			</Show>
		</PageWithNavbar>
	);
};
