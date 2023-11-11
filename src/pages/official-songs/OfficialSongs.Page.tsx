import { A } from '@solidjs/router';
import { Component, For, Show, createResource } from 'solid-js';
import { api } from '../../config/api/API';
import { Page } from '../../components/Page';

type OfficialSong = {
	Id: number;
	Title: string;
	Context: string;

	GameCode: string;
};

export const OfficialSongsPage = () => {
	const [data] = createResource(async () => {
		const res = await api.get(`OfficialSongs`);
		const json: OfficialSong[] = await res.json();
		return json;
	});

	return (
		<Page centered>
			<p>OfficialSongs.Page</p>

			<A href='/'>Index</A>

			<Show when={!data.loading} fallback={<div>Loading...</div>}>
				<div class='flex max-w-screen-2xl flex-row flex-wrap justify-center gap-8'>
					<For each={data()}>
						{(song) => <OfficialSongCard song={song} />}
					</For>
				</div>
			</Show>
		</Page>
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
