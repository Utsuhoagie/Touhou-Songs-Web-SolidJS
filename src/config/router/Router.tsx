import { RouteDefinition } from '@solidjs/router';
import { IndexPage } from '~/pages/Index.Page';
import { OfficialGamesPage } from '~/pages/app/official-games/OfficialGames.Page';
import { OfficialGamePage } from '~/pages/app/official-games/[game-code]/OfficialGame.Page';
import { OfficialSongsPage } from '~/pages/app/official-songs/OfficialSongs.Page';
import { OfficialSongPage } from '~/pages/app/official-songs/[id]/OfficialSong.Page';
import { CharactersPage } from '~/pages/app/characters/Characters.Page';
import { CharacterPage } from '~/pages/app/characters/[name]/Character.Page';
import { AuthRedirector } from '~/pages/AuthRedirector.Page';
import { Login } from '~/pages/auth/Login';

const APP_ROUTES: RouteDefinition[] = [
	{
		path: '/app',
		children: [
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
		],
	},
];
const AUTH_ROUTES: RouteDefinition[] = [
	{
		path: '/auth',
		children: [
			{
				path: '/login',
				component: Login,
			},
		],
	},
];

export const ROUTES: RouteDefinition[] = [
	{
		path: '',
		component: AuthRedirector,
		children: [...APP_ROUTES, ...AUTH_ROUTES],
	},
];
