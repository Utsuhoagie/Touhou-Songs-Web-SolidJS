import { RouteDefinition } from '@solidjs/router';
import { IndexPage } from '../../pages/Index.Page';
import { OfficialGamesPage } from '../../pages/official-games/OfficialGames.Page';
import { OfficialGamePage } from '../../pages/official-games/[game-code]/OfficialGame.Page';
import { OfficialSongsPage } from '../../pages/official-songs/OfficialSongs.Page';
import { OfficialSongPage } from '../../pages/official-songs/[id]/OfficialSong.Page';
import { CharactersPage } from '../../pages/characters/Characters.Page';
import { CharacterPage } from '../../pages/characters/[name]/Character.Page';

export const APP_ROUTES: RouteDefinition[] = [
	{
		path: '/',
		component: IndexPage,
	},
	{
		path: '/official-games',
		children: [
			{
				path: '/',
				component: OfficialGamesPage,
			},
			{
				path: '/:GameCode',
				component: OfficialGamePage,
			},
		],
	},
	{
		path: '/official-songs',
		children: [
			{
				path: '/',
				component: OfficialSongsPage,
			},
			{
				path: '/:Id',
				component: OfficialSongPage,
			},
		],
	},
	{
		path: '/characters',
		children: [
			{
				path: '/',
				component: CharactersPage,
			},
			{
				path: '/:Name',
				component: CharacterPage,
			},
		],
	},
];
