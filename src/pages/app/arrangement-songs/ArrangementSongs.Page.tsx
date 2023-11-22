import { A } from '@solidjs/router';
import { Component, For, Show, createResource } from 'solid-js';
import { PageWithNavbar } from '~/components/PageWithNavbar';
import { api } from '~/config/api/API';

type ArrangementSong = {
	Id: number;
	Title: string;
	Url: string;
	Status: 'Pending' | 'Confirmed' | 'Rejected';

	CircleName: string;
	OfficialSongTitles: string[];
};

export const ArrangementSongsPage = () => {
	const [data] = createResource(async () => {
		const res = await api().get('ArrangementSongs');
		const json: ArrangementSong[] = await res.json();
		return json;
	});

	return (
		<PageWithNavbar centered>
			<Show when={data()} fallback={<p>Loading...</p>}>
				<For each={data()}>
					{(arrangementSong) => (
						<ArrangementSongCard arrangementSong={arrangementSong} />
					)}
				</For>
			</Show>
		</PageWithNavbar>
	);
};

const ArrangementSongCard: Component<{ arrangementSong: ArrangementSong }> = (
	props
) => {
	function getYoutubeThumbnailUrl(url: string): string {
		const videoId = url.split('watch?v=')[1];
		return `https://img.youtube.com/vi/${videoId}/0.jpg`;
	}

	return (
		<A
			href={`${props.arrangementSong.Id}`}
			class='flex w-[400px] flex-col gap-2 rounded bg-slate-700 p-2'
		>
			<img
				class='w-full'
				src={getYoutubeThumbnailUrl(props.arrangementSong.Url)}
			/>
			<p class='text-lg font-medium'>{props.arrangementSong.Title}</p>
			<p class='font-medium'>{props.arrangementSong.CircleName}</p>
			<p class='text-sm italic text-slate-400'>
				{props.arrangementSong.Status}
			</p>

			<A
				href={props.arrangementSong.Url}
				target='_blank'
				class='hover:bg-red-900'
			>
				Go To URL
			</A>

			<p>Originals: {props.arrangementSong.OfficialSongTitles.join(', ')}</p>
		</A>
	);
};
