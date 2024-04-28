import { PageWithNavbar } from '~/components/PageWithNavbar';
import { LinkButton } from '~/components/buttons/LinkButton';

export const NotFound404Page = () => {
	return (
		<PageWithNavbar centered>
			<div>Sorry, that page doesn't exist!</div>
			<LinkButton href='/'>Back to Index</LinkButton>
		</PageWithNavbar>
	);
};
