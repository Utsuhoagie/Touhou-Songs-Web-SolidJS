import { Route, Router, Routes } from '@solidjs/router';
import { IndexPage } from '../../pages/Index.Page';
import { OfficialGamesPage } from '../../pages/official-games/OfficialGames.Page';
import { OfficialGamePage } from '../../pages/official-games/[game-code]/OfficialGame.Page';
import { OfficialSongsPage } from '../../pages/official-songs/OfficialSongs.Page';
import { OfficialSongPage } from '../../pages/official-songs/[id]/OfficialSong.Page';

export const AppRouter = () => (
	<Router>
		<Routes>
			<Route path='/' component={IndexPage} />

			<Route path='/official-games'>
				<Route path='/' component={OfficialGamesPage} />
				<Route path='/:GameCode' component={OfficialGamePage} />
			</Route>

			<Route path='/official-songs'>
				<Route path='/' component={OfficialSongsPage} />
				<Route path='/:Id' component={OfficialSongPage} />
			</Route>
		</Routes>
	</Router>
);
