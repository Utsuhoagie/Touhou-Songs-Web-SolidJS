/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import { APP_ROUTES } from './config/router/Router';
import { Router, useRoutes } from '@solidjs/router';

const root = document.getElementById('root');

const Routes = useRoutes(APP_ROUTES);

render(
	() => (
		<Router>
			<Routes />
		</Router>
	),
	root!
);
