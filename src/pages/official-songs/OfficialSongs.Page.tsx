import { A, useSearchParams } from '@solidjs/router';
import { Component, For, Show, createResource } from 'solid-js';
import { createStore } from 'solid-js/store';
import { api, createQueryString } from '../../config/api/API';
import { PageWithNavbar } from '../../components/PageWithNavbar';
import { JSX } from 'solid-js/h/jsx-runtime';

type OfficialSong = {
	Id: number;
	Title: string;
	Context: string;

	GameCode: string;
};

type SearchParams = {
	searchTitle: string;
};

export const OfficialSongsPage = () => {
	const [params, setParams] = useSearchParams<SearchParams>();

	const [data] = createResource(
		() => params.searchTitle,
		async () => {
			const res = await api.get('OfficialSongs', {
				searchParams: createQueryString(params),
			});
			return (await res.json()) as OfficialSong[];
		}
	);

	const [searchForm, setSearchForm] = createStore<SearchParams>({
		searchTitle: '',
	});

	const onSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
		event
	) => {
		event.preventDefault();
		setParams(searchForm);
	};

	return (
		<PageWithNavbar centered>
			<div class='w-full'>
				<form onSubmit={onSubmit}>
					<div class='flex flex-row items-center'>
						<label for='SearchTitle'>Search by Title:</label>
						<input
							id='SearchTitle'
							name='SearchTitle'
							value={searchForm.searchTitle}
							onInput={(e) =>
								setSearchForm({
									searchTitle: e.target.value,
								})
							}
						/>
					</div>
					<button type='submit'>Search</button>
				</form>

				<Show when={!data.loading} fallback={<div>Loading...</div>}>
					<div class='flex max-w-screen-2xl flex-row flex-wrap justify-center gap-8'>
						<For each={data()}>
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
