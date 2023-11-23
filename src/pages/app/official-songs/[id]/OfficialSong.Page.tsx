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
	const [resource] = createResource(async () => {
		const res = await api().get(`OfficialSongs/${Id}`);
		return (await res.json()) as OfficialSongDetail;
	});

	return (
		<PageWithNavbar centered>
			<Show when={resource()} fallback={<p>Loading...</p>}>
				{(song) => (
					<div class='flex flex-row justify-center gap-16'>
						<div class='flex flex-col gap-2'>
							<img src={song().Game.ImageUrl} />
							<p>{song().Title}</p>
							<p>
								{song().Context} - {song().Game.GameCode}
							</p>
						</div>
					</div>
				)}
			</Show>
		</PageWithNavbar>
	);
};
