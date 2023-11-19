import { ParentComponent } from 'solid-js';
import { clsx } from 'clsx';
import { A } from '@solidjs/router';
import { setSessionStore } from '~/pages/AuthRedirector.Page';

type PageWithNavbarProps = {
	centered?: true;
};

/** NOTE: Only use this once per page. There is a Navbar on top. */
export const PageWithNavbar: ParentComponent<PageWithNavbarProps> = (props) => {
	return (
		<div class='flex flex-col items-center'>
			<div class='flex flex-row justify-center'>
				<A class='p-1 hover:bg-slate-700' href='/app'>
					Index
				</A>
				<A class='p-1 hover:bg-slate-700' href='/app/official-games'>
					Official Games
				</A>
				<A class='p-1 hover:bg-slate-700' href='/app/official-songs'>
					Official Songs
				</A>
				<A class='p-1 hover:bg-slate-700' href='/app/characters'>
					Characters
				</A>
				<button
					class='p-1 hover:bg-rose-900'
					onClick={() => setSessionStore({ token: undefined })}
				>
					Log out
				</button>
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
