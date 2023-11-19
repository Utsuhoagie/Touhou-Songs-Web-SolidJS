import { Component, JSX } from 'solid-js';

type TextInputProps = JSX.InputHTMLAttributes<HTMLInputElement>;

export const TextInput: Component<TextInputProps> = (props) => {
	return (
		// eslint-disable-next-line solid/reactivity
		<input
			class='rounded border border-blue-900 bg-gray-700 p-1 outline-none focus:outline-blue-900'
			type={props.type}
			value={props.value}
			// eslint-disable-next-line solid/reactivity
			onInput={props.onInput}
			{...props}
		/>
	);
};
