import { A } from '@solidjs/router';
import { Component, For, Show, createResource } from 'solid-js';
import { PageWithNavbar } from '~/components/PageWithNavbar';
import { api } from '~/config/api/API';

type Circle = {
	Id: number;
	Name: string;
	Status: 'Pending' | 'Confirmed' | 'Rejected';

	ArrangementSongTitles: string[];
};

export const CirclesPage = () => {
	const [data] = createResource(async () => {
		const res = await api().get('Circles');

		const json: Circle[] = await res.json();
		return json;
	});

	return (
		<PageWithNavbar centered>
			<Show when={data()} fallback={<p>Loading...</p>}>
				<For each={data()}>
					{(circle) => <CircleCard circle={circle} />}
				</For>
			</Show>
		</PageWithNavbar>
	);
};

const CircleCard: Component<{ circle: Circle }> = (props) => {
	return (
		<A href={props.circle.Name} class='flex w-80 flex-row gap-4 rounded p-2'>
			<div class='flex flex-col gap-2'>
				<p class='text-lg font-medium'>{props.circle.Name}</p>
				<p class='text-sm italic text-slate-700'>{props.circle.Status}</p>
			</div>

			<p>{props.circle.ArrangementSongTitles.join(', ')}</p>
		</A>
	);
};
