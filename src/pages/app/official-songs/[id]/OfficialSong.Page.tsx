import { useParams } from '@solidjs/router';
import { Show, createResource } from 'solid-js';
import { PageWithNavbar } from '~/components/PageWithNavbar';
import { api } from '~/config/api/API';

type OfficialSongDetail = {
	Id: number;
	Title: string;
	Context: string;

	Game: {
		Title: string;
		GameCode: string;
		ImageUrl: string;
	};
};

export const OfficialSongPage = () => {
	const { Id } = useParams();
	const [data] = createResource(async () => {
		const res = await api().get(`OfficialSongs/${Id}`);
		const game: OfficialSongDetail = await res.json();
		return game;
	});

	return (
		<PageWithNavbar centered>
			<Show when={data()} fallback={<p>Loading...</p>}>
				{(game) => (
					<div class='flex flex-row justify-center gap-16'>
						<div class='flex flex-col gap-2'>
							<img src={game().Game.ImageUrl} />
							<p>{game().Title}</p>
							<p>
								{game().Context} - {game().Game.GameCode}
							</p>
						</div>
					</div>
				)}
			</Show>
		</PageWithNavbar>
	);
};
