import { For, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { PageWithNavbar } from '~/components/PageWithNavbar';

type TestMultiSelectForm = {
	ItemIds: number[];
};

const DATA = [1, 5, 7, 8, 9, 23, 47];

export const IndexPage = () => {
	const [form, setForm] = createStore<TestMultiSelectForm>({
		ItemIds: [],
	});

	const formData = () => [...form.ItemIds];
	createEffect(() => console.log(formData()));

	function toggleOption(opt: string) {
		const toggleItemId = Number(opt);
		if (form.ItemIds.includes(toggleItemId)) {
			setForm({
				...form,
				ItemIds: form.ItemIds.filter((f) => f !== toggleItemId),
			});
		} else {
			setForm({ ...form, ItemIds: [...form.ItemIds, toggleItemId] });
		}
	}

	return (
		<PageWithNavbar centered>
			<p>Index.Page</p>

			<select
				multiple
				// value={form.ItemIds.map((id) => id.toString())}
				onChange={(e) => {
					// setForm((prev) => ({ ...prev, ItemIds }));
					console.log({
						'e target options': e.target.options,
						'e target selectedOptions': e.target.selectedOptions,
					});
					toggleOption(e.target.value);
				}}
			>
				<For each={DATA}>
					{(ItemId) => <option value={ItemId}>{ItemId}</option>}
				</For>
			</select>
		</PageWithNavbar>
	);
};
