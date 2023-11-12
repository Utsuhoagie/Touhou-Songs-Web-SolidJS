import { A } from '@solidjs/router';
import { Component, For, Show, createResource } from 'solid-js';
import { api } from '../../config/api/API';
import { PageWithNavbar } from '../../components/PageWithNavbar';

type Character = {
	Id: number;
	Name: string;
	ImageUrl: string;
	OriginGameCode: string;

	SongTitles: string[];
};

export const CharactersPage = () => {
	const [data] = createResource(async () => {
		const res = await api.get(`Characters`);
		const json: Character[] = await res.json();
		return json;
	});

	return (
		<PageWithNavbar centered>
			<Show when={!data.loading} fallback={<div>Loading...</div>}>
				<div class='flex max-w-screen-2xl flex-row flex-wrap justify-center gap-8'>
					<For each={data()}>
						{(character) => <CharacterCard character={character} />}
					</For>
				</div>
			</Show>
		</PageWithNavbar>
	);
};

const CharacterCard: Component<{ character: Character }> = (props) => {
	const songsCount = () => props.character.SongTitles.length;

	return (
		<A
			// href={props.character.OriginGameCode}
			href='/'
			class='flex w-80 flex-col items-center gap-1 rounded-xl bg-slate-500 p-4 text-slate-900 shadow'
		>
			<img class='h-24 w-24' src={props.character.ImageUrl} />
			<p class='font-mono text-sm italic'>
				[{props.character.Id}] - {props.character.OriginGameCode}
			</p>
			<p class='text-lg font-bold'>{props.character.Name}</p>

			<p>{songsCount()} songs:</p>
			<For each={props.character.SongTitles}>
				{(songTitle) => <p class='w-full truncate'>{songTitle}</p>}
			</For>
		</A>
	);
};
