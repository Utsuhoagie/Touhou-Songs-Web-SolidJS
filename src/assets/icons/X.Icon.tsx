import { FiX } from 'solid-icons/fi';
import { Component } from 'solid-js';

type XIconProps = {
	size: 28 | 32 | 40;
	onClick?: () => void;
};

export const XIcon: Component<XIconProps> = (props) => {
	return (
		<FiX
			class='cursor-pointer p-1 hover:bg-slate-700'
			size={props.size}
			onClick={props.onClick}
		/>
	);
};
