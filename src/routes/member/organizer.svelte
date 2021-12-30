<script>
	import { onMount } from 'svelte';
	import { displayStatus, tableNumbering } from '$lib/utils';
	import Pagination from '$lib/components/Pagination.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { toast } from '$lib/modal';
	import OrganizerForm from '$lib/components/OrganizerForm.svelte';
	import OrganizerDetail from '$lib/components/OrganizerDetail.svelte';

	const title = 'Organizer';
	let list = [];
	let current_page = 1;
	let modalForm;
	let modalDetail;

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
			<a href={null} on:click={() => modalForm.showModal()} class="button is-primary">Add New</a>
		</div>
		<br />
		<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
			<tr>
				<th>#</th>
				<th>Organizer Name</th>
				<th>Status</th>
				<th>Action</th>
			</tr>

			{#if list?.total > 0}
				{#each list.data as r, index}
					<tr>
						<td>{tableNumbering(index, current_page)}</td>
						<td>{r.organizer_name}</td>
						<td>{@html displayStatus(r.organizer_verified_status_name)}</td>
						<td class="has-text-centered" data-label="Action">
							<div class="dropdown is-right is-hoverable">
								<div class="dropdown-trigger">
									<button class="button is-primary is-small" aria-haspopup="true" aria-controls="dropdown-menu"><span class="icon is-small">•••</span></button>
								</div>
								<div class="dropdown-menu" id="dropdown-menu" role="menu">
									<div class="dropdown-content">
										<a href={null} class="dropdown-item" on:click={() => modalDetail.showModal(r.organizer_id)}>View Detail</a>
										<hr class="dropdown-divider" />
										<!-- <a href={null} class="dropdown-item" on:click={() => onItemClick(item)}>Edit</a> -->
										<!-- <hr class="dropdown-divider" />
														<a href={null} class="dropdown-item" on:click={() => displayUploadDocument(item)}>Upload Dokumen</a> -->
									</div>
								</div>
							</div>
						</td>
					</tr>
				{/each}
			{:else if list?.total === 0}
				<tr>
					<td colspan="7" align="center">No data found</td>
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

<OrganizerForm bind:this={modalForm} on:getList={getList} />
<OrganizerDetail bind:this={modalDetail} />
