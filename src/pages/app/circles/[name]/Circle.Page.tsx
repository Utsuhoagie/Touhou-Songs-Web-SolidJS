import { useParams } from '@solidjs/router';
import { For, Show, createResource } from 'solid-js';
import { PageWithNavbar } from '~/components/PageWithNavbar';
import { api } from '~/config/api/API';
import { UnofficialStatus } from '~/shared/UnofficialStatus.Type';

type CircleDetail = {
	Id: number;
	Name: string;
	Status: UnofficialStatus;

	ArrangementSongTitles: string[];
};

export const CirclePage = () => {
	const { Name } = useParams();
	const [resource] = createResource(async () => {
		const res = await api().get(`Circles/${Name}`);
		return (await res.json()) as CircleDetail;
	});

	return (
		<PageWithNavbar centered>
			<Show when={resource()} fallback={<p>Loading...</p>}>
				{(circle) => (
					<div class='flex flex-col gap-4'>
						<div class='rounded bg-slate-700 p-2'>
							<p class='text-lg font-bold'>{circle().Name}</p>
							<p class='italic text-slate-400'>{circle().Status}</p>
						</div>

						<div class='flex flex-col gap-2'>
							<p>List of Arrangements:</p>
							<For each={circle().ArrangementSongTitles}>
								{(arSongTitle) => (
									<p class='bg-slate-700 p-2 hover:bg-slate-500'>
										{arSongTitle}
									</p>
								)}
							</For>
						</div>
					</div>
				)}
			</Show>
		</PageWithNavbar>
	);
};
