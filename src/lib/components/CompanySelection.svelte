<script>
	import { onMount } from 'svelte';
	import Select from 'svelte-select';
	import Item from './CompanyItem.svelte';

	export let selected;
	export let selectedValue; //sebagai id untuk diattach lgsg (ketika edit)
	const optionIdentifier = 'company_id';
	const getSelectionLabel = (row) => row.company_name;
	let list = [];

	onMount(async () => {
		await fetching();
	});

	async function fetching(search) {
		list = await getList(search);
		return list; //return untuk mengupdate list
	}

	async function getList(search = null) {
		//query parameter
		let query = [];
		let result;

		//query
		if (search) query.push(`company_name=${search}`);

		//jika ada query parameter
		if (query.length > 0) result = await fetch(`/api/company?company_active_status=1&company_verified_status_name=verified&${query.join('&')}`);
		else result = await fetch('/api/company?company_active_status=1&company_verified_status_name=verified');

		const { success, error, data } = await result.json();

		//return
		if (success) return data;
	}

	//balikin id
	function handleSelect(params) {
		selected = params.detail.company_id; //default balikin id
		// $current_company = params.detail;
		// $current_company_id = params.detail.company_id;
	}
</script>

<Select loadOptions={fetching} isMulti={false} {getSelectionLabel} on:select={handleSelect} {Item} items={list} {optionIdentifier} bind:selectedValue placeholder="- Choose -" />
