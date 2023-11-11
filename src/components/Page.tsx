import { ParentComponent } from 'solid-js';
import { clsx } from 'clsx';

type PageProps = {
	centered?: true;
};

export const Page: ParentComponent<PageProps> = (props) => {
	return (
		<div
			class={clsx(
				'flex min-h-screen w-full flex-col p-4',
				props.centered && 'items-center'
			)}
		>
			{props.children}
		</div>
	);
};
