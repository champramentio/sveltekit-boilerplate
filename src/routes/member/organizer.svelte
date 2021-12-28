<script>
	import { onMount } from 'svelte';
	import { displayStatus, tableNumbering } from '$lib/utils';
	import Pagination from '$lib/components/Pagination.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { toast } from '$lib/modal';

	let list = [];
	let current_page = 1;
	const title = 'Organizer';

	onMount(async () => {
		await getList();
	});

	async function getList(page = current_page) {
		const result = await fetch(`/api/organizer?page=${page}`);
		list = await result.json();
		if (list.error) toast('error', list.error);
	}

	async function paging(passing) {
		const which_page = passing.detail.which_page;
		if (current_page !== which_page) {
			current_page = which_page;
			await getList(which_page);
		}
	}
</script>

<sapper:head>
	<title>{title}</title>
</sapper:head>

<div class="container">
	<div class="column"><h1>{title}</h1></div>
	<div class="column">
		<div>
			<a href="/member/organizer/add" class="button is-primary">Add New</a>
		</div>
		<br />
		<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
			<tr>
				<th>#</th>
				<th>Organizer Name</th>
				<th>Status</th>
			</tr>

			{#if list?.total > 0}
				{#each list.data as r, index}
					<tr>
						<td>{tableNumbering(index, current_page)}</td>
						<td>{r.organizer_name}</td>
						<td>{@html displayStatus(r.organizer_verified_status_name)}</td>
					</tr>
				{/each}
			{:else if list?.total === 0}
				<tr>
					<td colspan="7" align="center">Data tidak ditemukan.</td>
				</tr>
			{:else}
				<tr>
					<td colspan="7" class="has-text-centered">
						{#if list.error}
							{list.error}
						{:else}
							<Spinner />
						{/if}
					</td>
				</tr>
			{/if}
		</table>

		{#if list.total > 0}
			<Pagination on:paging={paging} {current_page} page={list.page} last_page={list.last_page} />
		{/if}
	</div>
</div>
