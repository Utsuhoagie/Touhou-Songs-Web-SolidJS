import { A, useParams } from '@solidjs/router';
import { For, Show, createResource } from 'solid-js';
import { PageWithNavbar } from '~/components/PageWithNavbar';
import { api } from '~/config/api/API';

type ArrangementSong = {
	Id: number;
	Title: string;
	Url: string;
	Status: 'Pending' | 'Confirmed' | 'Rejected';

	CircleName: string;
	OfficialSongs: {
		Id: number;
		Title: string;
	}[];
};

export const ArrangementSongPage = () => {
	const { Id } = useParams();
	const [data] = createResource(async () => {
		const res = await api().get(`ArrangementSongs/${Id}`);
		const json: ArrangementSong = await res.json();
		return json;
	});

	function getYoutubeThumbnailUrl(url: string): string {
		const videoId = url.split('watch?v=')[1];
		return `https://img.youtube.com/vi/${videoId}/0.jpg`;
	}

	return (
		<PageWithNavbar centered>
			<Show when={data()} fallback={<p>Loading...</p>}>
				{(arrangementSong) => (
					<div class='flex flex-col gap-4'>
						<img
							class='w-full'
							src={getYoutubeThumbnailUrl(arrangementSong().Url)}
						/>

						<p class='text-lg font-medium'>{arrangementSong().Title}</p>
						<p class='font-medium'>{arrangementSong().CircleName}</p>

						<div>
							<p>Original Songs:</p>
							<For each={arrangementSong().OfficialSongs}>
								{(officialSong) => (
									<A
										href={`/app/official-songs/${officialSong.Id}`}
										class='block rounded bg-slate-700'
									>
										{officialSong.Title}
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
