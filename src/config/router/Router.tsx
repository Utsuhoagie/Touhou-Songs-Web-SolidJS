import { Route, Router, Routes } from '@solidjs/router';
import { IndexPage } from '../../pages/Index.Page';
import { OfficialGamesPage } from '../../pages/official-games/OfficialGames.Page';
import { OfficialGamePage } from '../../pages/official-games/[game-code]/OfficialGame.Page';

export const AppRouter = () => (
	<Router>
		<Routes>
			<Route path='/' component={IndexPage} />
			<Route path='/official-games'>
				<Route path='/' component={OfficialGamesPage} />
				<Route path='/:GameCode' component={OfficialGamePage} />
			</Route>
		</Routes>
	</Router>
);
