import { JSX, ParentComponent } from 'solid-js';

type SelectInputProps = JSX.SelectHTMLAttributes<HTMLSelectElement>;

export const SelectInput: ParentComponent<SelectInputProps> = (props) => {
	return (
		<select
			class='w-80 rounded border border-blue-900 bg-gray-700 p-1 outline-none focus:outline-blue-900'
			{...props}
		>
			{props.children}
		</select>
	);
};
