import { A, useParams } from '@solidjs/router';
import { For, Show, createResource } from 'solid-js';
import { PageWithNavbar } from '~/components/PageWithNavbar';
import { api } from '~/config/api/API';

type CharacterDetail = {
	Id: number;
	Name: string;
	ImageUrl: string;

	OriginGame: {
		Title: string;
		GameCode: string;
		NumberCode: string;
		ImageUrl: string;
	};
	Songs: {
		Id: string;
		Title: string;
		Context: string;
	}[];
};

export const CharacterPage = () => {
	const { Name } = useParams();
	const [resource] = createResource(async () => {
		const res = await api().get(`Characters/${Name}`);
		return (await res.json()) as CharacterDetail;
	});

	return (
		<PageWithNavbar>
			<Show when={resource()} fallback={<p>Loading...</p>}>
				{(character) => (
					<div class='flex flex-col items-center gap-2'>
						<img class='h-60' src={character().ImageUrl} />
						<p class='text-lg font-semibold'>{character().Name}</p>
						<p class='text-sm text-slate-500'>
							{character().OriginGame.Title}
						</p>
						<div class='mt-4'>
							<p>Songs:</p>
							<For each={character().Songs}>
								{(song) => (
									<A
										class='rounded-xl bg-slate-700 p-2'
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
