import clsx from 'clsx';
import { Component, For, JSX, createEffect, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

type Option = {
	value: string | number;
	label: string;
};

type SingleSelectInputProps = JSX.SelectHTMLAttributes<HTMLSelectElement> & {
	options: Option[];
};

export const SingleSelectInput: Component<SingleSelectInputProps> = (props) => {
	return (
		<select
			class='w-80 rounded border border-blue-900 bg-gray-700 p-1 outline-none focus:outline-blue-900'
			{...props}
		>
			<For each={props.options}>
				{(opt) => <option value={opt.value}>{opt.label}</option>}
			</For>
		</select>
	);
};

type MultiSelectInputProps = SingleSelectInputProps & {
	searchBy: 'value' | 'label';
	setter: (selectedValues: (string | number)[]) => void;
};

export const MultiSelectInput: Component<MultiSelectInputProps> = (props) => {
	const [selectedOptions, setSelectedOptions] = createStore<Option[]>([]);

	const [comboboxSearch, setComboboxSearch] = createSignal<string>('');
	const searchedOptions = () => {
		if (!comboboxSearch()) {
			return [];
		}

		return props.options.filter((option) =>
			option[props.searchBy]
				.toString()
				.toLowerCase()
				.includes(comboboxSearch().toLowerCase())
		);
	};

	createEffect(() => {
		const selectedOptionValues = () =>
			selectedOptions.map((selectedOption) => selectedOption.value);
		props.setter(selectedOptionValues());
	});

	function isSearchedOptionSelected(opt: Option) {
		const selectedOptionValues = selectedOptions.map(
			(selectedOption) => selectedOption.value
		);

		return selectedOptionValues.includes(opt.value);
	}

	return (
		<div class='flex flex-col gap-2'>
			<input
				id='search'
				value={comboboxSearch()}
				onInput={(e) => setComboboxSearch(e.target.value)}
			/>
			<div class='flex h-40 w-80 flex-col overflow-y-scroll rounded p-2'>
				<For each={searchedOptions()}>
					{(searchedOption) => (
						<p
							class={clsx(
								isSearchedOptionSelected(searchedOption) &&
									'bg-green-800',
								'hover:bg-pink-950'
							)}
							onClick={() =>
								setSelectedOptions((selectedOptions) =>
									isSearchedOptionSelected(searchedOption)
										? selectedOptions.filter(
												(selectedOption) =>
													selectedOption.value !==
													searchedOption.value
										  )
										: [...selectedOptions, searchedOption]
								)
							}
						>
							[{searchedOption.label}] - {searchedOption.value}
						</p>
					)}
				</For>
			</div>
		</div>
	);
};
