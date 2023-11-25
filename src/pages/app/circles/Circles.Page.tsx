import { A } from '@solidjs/router';
import { Component, For, Show, createResource } from 'solid-js';
import { CheckIcon } from '~/assets/icons/Check.Icon';
import { XIcon } from '~/assets/icons/X.Icon';
import { PageWithNavbar } from '~/components/PageWithNavbar';
import { api } from '~/config/api/API';
import { UnofficialStatus } from '~/shared/UnofficialStatus.Type';
import { AuthUtils } from '~/utils/AuthUtils';

type Circle = {
	Id: number;
	Name: string;
	Status: UnofficialStatus;

	ArrangementSongTitles: string[];
};

export const CirclesPage = () => {
	const [resource] = createResource(async () => {
		const res = await api().get('Circles');
		return (await res.json()) as Circle[];
	});

	return (
		<PageWithNavbar centered>
			<Show when={resource()} fallback={<p>Loading...</p>}>
				<A href='create' class='hover:bg-red-900'>
					Create new Circle
				</A>
				<div class='flex flex-col gap-2'>
					<For each={resource()}>
						{(circle) => (
							<CircleCard
								circle={circle}
								isApprovable={
									AuthUtils.isAdmin() && circle.Status === 'Pending'
								}
							/>
						)}
					</For>
				</div>
			</Show>
		</PageWithNavbar>
	);
};

type CircleCardProps = {
	circle: Circle;
	isApprovable?: boolean;
};

const CircleCard: Component<CircleCardProps> = (props) => {
	async function validateCircleStatus(Name: string, Status: UnofficialStatus) {
		const res = await api().put(`Circles/${Name}/ValidateStatus`, {
			json: { Status },
		});

		return res;
	}

	return (
		<div class='flex flex-row items-center gap-2'>
			<A
				href={props.circle.Name}
				class='flex w-[600px] flex-row gap-4 rounded bg-slate-700 p-2'
			>
				<div class='flex flex-col gap-2'>
					<p class='text-lg font-medium'>{props.circle.Name}</p>
					<p class='text-sm italic text-slate-500'>
						{props.circle.Status}
					</p>
				</div>
				<p>{props.circle.ArrangementSongTitles.join(', ')}</p>
			</A>

			<Show when={props.isApprovable}>
				<div class='flex flex-col gap-2'>
					<CheckIcon
						size={28}
						onClick={() =>
							validateCircleStatus(props.circle.Name, 'Confirmed')
						}
					/>
					<XIcon size={28} />
				</div>
			</Show>
		</div>
	);
};
