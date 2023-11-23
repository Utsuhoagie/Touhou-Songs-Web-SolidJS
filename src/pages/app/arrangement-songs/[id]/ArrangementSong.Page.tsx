import { A, useParams } from '@solidjs/router';
import { For, Show, createResource } from 'solid-js';
import { PageWithNavbar } from '~/components/PageWithNavbar';
import { api } from '~/config/api/API';
import { UnofficialStatus } from '~/shared/UnofficialStatus.Type';
import { getYoutubeThumbnailUrl } from '~/utils/VideoUtils';

type ArrangementSongDetail = {
	Id: number;
	Title: string;
	Url: string;
	Status: UnofficialStatus;

	CircleName: string;
	OfficialSongs: {
		Id: number;
		Title: string;
	}[];
};

export const ArrangementSongPage = () => {
	const { Id } = useParams();
	const [resource] = createResource(async () => {
		const res = await api().get(`ArrangementSongs/${Id}`);
		return (await res.json()) as ArrangementSongDetail;
	});

	return (
		<PageWithNavbar centered>
			<Show when={resource()} fallback={<p>Loading...</p>}>
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
