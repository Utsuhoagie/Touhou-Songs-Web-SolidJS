import clsx from 'clsx';
import { JSX, ParentComponent } from 'solid-js';

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
	width: 'medium' | 'full';
};

export const Button: ParentComponent<ButtonProps> = (props) => {
	return (
		<button
			class={clsx(
				props.width === 'medium' && 'w-40',
				props.width === 'full' && 'w-full',
				'rounded bg-indigo-900 p-1 text-slate-300 hover:bg-indigo-950'
			)}
			type={props.type}
		>
			{props.children}
		</button>
	);
};
