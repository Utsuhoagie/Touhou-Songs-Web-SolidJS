import { A, useParams } from '@solidjs/router';
import { For, Show, createResource } from 'solid-js';
import { api } from '../../../config/api/API';
import dayjs from 'dayjs';
import { PageWithNavbar } from '../../../components/PageWithNavbar';

type OfficialGameDetail = {
	Id: number;
	Title: string;
	GameCode: string;
	ReleaseDate: Date;
	ImageUrl: string;

	Songs: {
		Id: number;
		Title: string;
		Context: string;
	}[];
};

export const OfficialGamePage = () => {
	const { GameCode } = useParams();
	const [data] = createResource(async () => {
		const res = await api.get(`OfficialGames/${GameCode}`);
		const game: OfficialGameDetail = await res.json();
		return game;
	});

	return (
		<PageWithNavbar centered>
			<Show when={data()} fallback={<p>Loading...</p>}>
				{(game) => (
					<div class='flex flex-row justify-center gap-16'>
						<div class='flex flex-col gap-2'>
							<img src={game().ImageUrl} />
							<p>[{game().Id}]</p>
							<p>
								{game().Title} ({game().GameCode})
							</p>
							<p>{dayjs(game().ReleaseDate).toString()}</p>
						</div>
						<div class='flex flex-col gap-2'>
							<For each={game().Songs}>
								{(song) => (
									<A
										class='rounded-xl bg-slate-300 p-2 text-slate-900 hover:bg-slate-500'
										href={`/official-songs/${song.Id}`}
									>
										{song.Title} - {song.Context}
									</A>
								)}
							</For>
						</div>
					</div>
				)}
			</Show>
		</PageWithNavbar>
	);
};
