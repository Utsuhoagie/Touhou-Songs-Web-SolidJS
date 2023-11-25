import { FiCheck } from 'solid-icons/fi';
import { Component } from 'solid-js';

type CheckIconProps = {
	size: 28 | 32 | 40;
	onClick?: () => void;
};

export const CheckIcon: Component<CheckIconProps> = (props) => {
	return (
		<FiCheck
			class='cursor-pointer p-1 hover:bg-slate-700'
			size={props.size}
			onClick={props.onClick}
		/>
	);
};
