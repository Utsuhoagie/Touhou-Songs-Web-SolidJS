import { ParentComponent } from 'solid-js';
import { clsx } from 'clsx';
import { A } from '@solidjs/router';

type PageWithNavbarProps = {
	centered?: true;
};

/** NOTE: Only use this once per page. There is a Navbar on top. */
export const PageWithNavbar: ParentComponent<PageWithNavbarProps> = (props) => {
	return (
		<div class='flex flex-col items-center'>
			<div class='flex flex-row justify-center'>
				<A class='p-1 hover:bg-slate-700' href='/'>
					Index
				</A>
				<A class='p-1 hover:bg-slate-700' href='/official-games'>
					Official Games
				</A>
				<A class='p-1 hover:bg-slate-700' href='/official-songs'>
					Official Songs
				</A>
				<A class='p-1 hover:bg-slate-700' href='/characters'>
					Characters
				</A>
			</div>

			<div
				class={clsx(
					'flex min-h-screen w-full flex-col p-4',
					props.centered && 'items-center'
				)}
			>
				{props.children}
			</div>
		</div>
	);
};
