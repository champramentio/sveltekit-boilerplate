<script>
	import { onMount } from 'svelte';
	import Select from 'svelte-select';
	import Item from './CompanyItem.svelte';

	export let selected;
	export let selectedValue; //sebagai id untuk diattach lgsg (ketika edit)
	const optionIdentifier = 'company_id';
	let list = [];

	onMount(async () => {
		await getList();
	});

	const getSelectionLabel = (option) => option?.company_name;

	async function getList(search = null) {
		//parameter
		let query = ['company_active_status=1', 'company_verified_status_name=verified'];
		if (search) query.push(`company_name=${search}`);

		//query
		let result = await fetch(`/api/company?${query.join('&')}`);
		const { data } = await result.json();
		if (data) list = data;
		return list;
	}

	//balikin id
	function handleSelect(event) {
		selected = event.detail.company_id; //default balikin id
	}
</script>

<Select
	loadOptions={getList}
	isClearable={true}
	isMulti={false}
	{getSelectionLabel}
	on:select={handleSelect}
	{Item}
	items={list}
	{optionIdentifier}
	bind:selectedValue
	placeholder="- Choose -"
/>
