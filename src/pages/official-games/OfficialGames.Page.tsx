import { A } from '@solidjs/router';
import dayjs from 'dayjs';
import { Component, For, Show, createResource } from 'solid-js';
import { api } from '../../config/api/API';
import { Page } from '../../components/Page';

type OfficialGame = {
	Id: number;
	Title: string;
	GameCode: string;
	ReleaseDate: Date;
	ImageUrl: string;

	SongTitles: string[];
};

export const OfficialGamesPage = () => {
	const [data] = createResource(async () => {
		const res = await api.get(`OfficialGames`);
		const json: OfficialGame[] = await res.json();
		return json;
	});

	return (
		<Page centered>
			<p>OfficialGames.Page</p>

			<A href='/'>Index</A>

			<Show when={!data.loading} fallback={<div>Loading...</div>}>
				<div class='flex max-w-screen-2xl flex-row flex-wrap justify-center gap-8'>
					<For each={data()}>
						{(game) => <OfficialGameCard game={game} />}
					</For>
				</div>
			</Show>
		</Page>
	);
};

const OfficialGameCard: Component<{ game: OfficialGame }> = (props) => {
	const songsCount = () => props.game.SongTitles.length;

	const randomIndexes = () => {
		const res: number[] = [];

		for (let i = 0; i < songsCount(); i++) {
			if (res.length === 5) {
				break;
			}

			const chance = Math.random();

			if (chance < 0.25 || i <= 1) {
				const index = Math.abs(
					Math.floor(Math.random() * songsCount() - 1)
				);

				if (!res.includes(index)) {
					res.push(index);
				}
			}
		}

		res.sort((a, b) => a - b);

		return res;
	};

	return (
		<A
			href={props.game.GameCode}
			class='flex w-80 flex-col items-center gap-1 rounded-xl bg-slate-500 p-4 text-slate-900 shadow'
		>
			<img class='h-24 w-24' src={props.game.ImageUrl} />
			<p class='font-mono text-sm italic'>
				[{props.game.Id}] - {props.game.GameCode}
			</p>
			<p class='text-lg font-bold'>{props.game.Title}</p>
			<p class='font-light italic text-slate-700'>
				{dayjs(props.game.ReleaseDate).toString()}
			</p>
			<p>{songsCount()} songs:</p>
			<For each={randomIndexes()}>
				{(randomIndex) => (
					<p class='w-full truncate'>
						{props.game.SongTitles[randomIndex]}
					</p>
				)}
			</For>
			<p>...</p>
		</A>
	);
};
