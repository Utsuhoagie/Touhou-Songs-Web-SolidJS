import { RouteDefinition } from '@solidjs/router';
import { IndexPage } from '~/pages/Index.Page';
import { OfficialGamesPage } from '~/pages/app/official-games/OfficialGames.Page';
import { OfficialGamePage } from '~/pages/app/official-games/[game-code]/OfficialGame.Page';
import { OfficialSongsPage } from '~/pages/app/official-songs/OfficialSongs.Page';
import { OfficialSongPage } from '~/pages/app/official-songs/[id]/OfficialSong.Page';
import { CharactersPage } from '~/pages/app/characters/Characters.Page';
import { CharacterPage } from '~/pages/app/characters/[name]/Character.Page';
import { AuthRedirector } from '~/pages/AuthRedirector.Page';
import { LoginPage } from '~/pages/auth/Login.Page';
import { CirclesPage } from '~/pages/app/circles/Circles.Page';
import { CirclePage } from '~/pages/app/circles/[name]/Circle.Page';
import { ArrangementSongsPage } from '~/pages/app/arrangement-songs/ArrangementSongs.Page';
import { ArrangementSongPage } from '~/pages/app/arrangement-songs/[id]/ArrangementSong.Page';
import { CreateCirclePage } from '~/pages/app/circles/create/CreateCircle.Page';
import { RegisterPage } from '~/pages/auth/Register.Page';
import { CreateArrangementSongPage } from '~/pages/app/arrangement-songs/create/CreateArrangementSong.Page';
import { NotFound404Page } from '~/pages/app/404/NotFound404.Page';

const APP_ROUTES: RouteDefinition[] = [
	{
		path: '/app',
		children: [
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
			{
				path: '/circles',
				children: [
					{
						path: '/',
						component: CirclesPage,
					},
					{
						path: '/:Name',
						component: CirclePage,
					},
					{
						path: '/create',
						component: CreateCirclePage,
					},
				],
			},
			{
				path: '/arrangement-songs',
				children: [
					{
						path: '/',
						component: ArrangementSongsPage,
					},
					{
						path: '/:Id',
						component: ArrangementSongPage,
					},
					{
						path: 'create',
						component: CreateArrangementSongPage,
					},
				],
			},
			{
				path: '/',
				component: IndexPage,
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
				component: LoginPage,
			},
			{
				path: '/register',
				component: RegisterPage,
			},
		],
	},
];

export const ROUTES: RouteDefinition[] = [
	{
		path: '',
		component: AuthRedirector,
		children: [
			...APP_ROUTES,
			...AUTH_ROUTES,
			{
				path: '/*',
				component: NotFound404Page,
			},
		],
	},
];
