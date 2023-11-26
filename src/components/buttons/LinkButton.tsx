import { A } from '@solidjs/router';
import { JSX, ParentComponent } from 'solid-js';

type LinkButtonProps = JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
	href: string;
};

export const LinkButton: ParentComponent<LinkButtonProps> = (props) => {
	return (
		<A
			class='flex w-48 flex-row justify-center rounded bg-indigo-900 p-1 text-slate-300 hover:bg-indigo-950'
			href={props.href}
		>
			{props.children}
		</A>
	);
};
