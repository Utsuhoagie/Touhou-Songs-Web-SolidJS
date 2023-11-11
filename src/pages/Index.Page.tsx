import { A } from '@solidjs/router';
import { Page } from '../components/Page';

export const IndexPage = () => {
	return (
		<Page centered>
			<p>Index.Page</p>
			<A class='n' href='/official-games'>
				Official Games
			</A>
		</Page>
	);
};
