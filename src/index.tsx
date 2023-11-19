/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import { ROUTES } from '~/config/router/Router';
import { Router, useRoutes } from '@solidjs/router';

const root = document.getElementById('root');

const Routes = useRoutes(ROUTES);

render(
	() => (
		<Router>
			<Routes />
		</Router>
	),
	root!
);
