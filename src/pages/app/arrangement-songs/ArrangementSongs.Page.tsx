import { A } from '@solidjs/router';
import { Component, For, Show, createResource } from 'solid-js';
import { PageWithNavbar } from '~/components/PageWithNavbar';
import { LinkButton } from '~/components/buttons/LinkButton';
import { api } from '~/config/api/API';
import { UnofficialStatus } from '~/shared/UnofficialStatus.Type';
import { getYoutubeThumbnailUrl } from '~/utils/VideoUtils';

type ArrangementSong = {
	Id: number;
	Title: string;
	Url: string;
	Status: UnofficialStatus;

	CircleName: string;
	OfficialSongTitles: string[];
};

export const ArrangementSongsPage = () => {
	const [resource] = createResource(async () => {
		const res = await api().get('ArrangementSongs');
		return (await res.json()) as ArrangementSong[];
	});

	return (
		<PageWithNavbar centered>
			<LinkButton href='create'>Create new Arrangement</LinkButton>
			<Show when={resource()} fallback={<p>Loading...</p>}>
				<For each={resource()}>
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
