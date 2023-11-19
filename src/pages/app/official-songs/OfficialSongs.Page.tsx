import { A, useSearchParams } from '@solidjs/router';
import { Component, For, Show, createResource } from 'solid-js';
import { createStore } from 'solid-js/store';
import { JSX } from 'solid-js';
import { api, createQueryString } from '~/config/api/API';
import { PageWithNavbar } from '~/components/PageWithNavbar';

type OfficialSong = {
	Id: number;
	Title: string;
	Context: string;

	GameCode: string;
};

type OfficialGame = {
	Id: number;
	Title: string;
	GameCode: string;
	ReleaseDate: Date;
	ImageUrl: string;

	SongTitles: string[];
};

type SearchParams = {
	SearchTitle: string;
	GameCode: string;
};

export const OfficialSongsPage = () => {
	const [params, setParams] = useSearchParams<SearchParams>();

	const [games] = createResource(async () => {
		const res = await api().get('OfficialGames');
		return (await res.json()) as OfficialGame[];
	});

	const [songs] = createResource(
		() => [params.SearchTitle, params.GameCode],
		async () => {
			console.log({ searchParams: createQueryString(params) });
			const res = await api().get('OfficialSongs', {
				searchParams: createQueryString(params),
			});
			return (await res.json()) as OfficialSong[];
		}
	);

	const [searchForm, setSearchForm] = createStore<SearchParams>({
		SearchTitle: '',
		GameCode: '',
	});

	const onSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
		event
	) => {
		event.preventDefault();
		console.log('submit', searchForm);
		setParams(searchForm);
	};

	return (
		<PageWithNavbar centered>
			<div class='w-full'>
				<form onSubmit={onSubmit}>
					<div class='flex flex-row items-center gap-4'>
						<div class='flex flex-row gap-2'>
							<label for='SearchTitle'>Search by Title:</label>
							<input
								id='SearchTitle'
								name='SearchTitle'
								value={searchForm.SearchTitle}
								onInput={(e) =>
									setSearchForm({
										...searchForm,
										SearchTitle: e.currentTarget.value,
									})
								}
							/>
						</div>

						<div class='flex flex-row gap-2'>
							<label for='GameCode'>From game:</label>
							<select
								id='GameCode'
								name='GameCode'
								value={searchForm.GameCode}
								onChange={(e) =>
									setSearchForm({
										...searchForm,
										GameCode: e.currentTarget.value,
									})
								}
							>
								<option value=''>None...</option>
								<For each={games()}>
									{(game) => (
										<option value={game.GameCode}>
											{game.Title}
										</option>
									)}
								</For>
							</select>
						</div>
					</div>
					<button type='submit'>Search</button>
				</form>

				<Show when={!songs.loading} fallback={<div>Loading...</div>}>
					<div class='flex max-w-screen-2xl flex-row flex-wrap justify-center gap-8'>
						<For each={songs()}>
							{(song) => <OfficialSongCard song={song} />}
						</For>
					</div>
				</Show>
			</div>
		</PageWithNavbar>
	);
};

const OfficialSongCard: Component<{ song: OfficialSong }> = (props) => {
	return (
		<A
			href={`${props.song.Id}`}
			class='flex w-80 flex-col items-center gap-1 rounded-xl bg-slate-500 p-4 text-slate-900 shadow'
		>
			{/* <img class='h-24 w-24' src={props.song.ImageUrl} /> */}
			<p class='font-mono text-sm italic'>
				[{props.song.Id}] - {props.song.GameCode}
			</p>
			<p class='text-lg font-bold'>{props.song.Title}</p>
			<p class='font-light italic text-slate-700'>{props.song.Context}</p>
		</A>
	);
};
