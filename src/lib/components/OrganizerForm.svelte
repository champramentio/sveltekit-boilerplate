<script>
	import { modal } from '$lib/modal';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import CompanySelection from '$lib/components/CompanySelection.svelte';

	let row = {};
	let isOpen = false;
	$: if (isOpen) {
		reset();
	}

	export function showModal() {
		isOpen = true;
	}

	function closeModal() {
		isOpen = false;
		reset();
	}

	function reset() {
		row = {
			organizer_name: 's',
			organizer_email: 's@g.com',
			organizer_phone1: 's',
			organizer_address: 's',
			organizer_zip: '1111',
			ms_city_id: '1111',
			user_id: undefined,
			company_id: 1,
			organizer_logo: 'ssss'
		};
	}

	async function submitting() {
		let result = await fetch(`/api/organizer`, { method: 'POST', body: JSON.stringify(row) });
		const { success, error, data } = await result.json();

		if (error) modal('error', 'error', error);
		if (success) {
			modal('success', 'success', success);
			dispatch('getList');
			closeModal();
		}
	}
</script>

<div class="modal {isOpen ? 'is-active' : ''}">
	<div class="modal-background" />
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">Organizer Form</p>
			<button class="delete" aria-label="close" on:click={() => closeModal()} />
		</header>
		<section class="modal-card-body">
			<div class="columns is-desktop">
				<div class="column field">
					<label class="label">Organizer Name</label>
					<pre>{JSON.stringify(row, null, 2)}</pre>
					<div class="control">
						<input class="input" type="text" bind:value={row.organizer_name} />
					</div>
				</div>
				<div class="column field">
					<label class="label">Email</label>
					<div class="control">
						<input class="input" type="text" bind:value={row.organizer_email} />
					</div>
				</div>
				<div class="column field">
					<label class="label">Phone (1)</label>
					<div class="control">
						<input class="input" type="text" bind:value={row.organizer_phone1} />
					</div>
				</div>
				<div class="column field">
					<label class="label">Address</label>
					<div class="control">
						<input class="input" type="text" bind:value={row.organizer_address} />
					</div>
				</div>
				<div class="column field">
					<label class="label">Zip Code</label>
					<div class="control">
						<input class="input" type="text" bind:value={row.organizer_zip} />
					</div>
				</div>
				<div class="column field">
					<label class="label">City</label>
					<div class="control">
						<input class="input" type="text" bind:value={row.ms_city_id} />
					</div>
				</div>
				<div class="column field">
					<label class="label">User</label>
					<div class="control">
						<input class="input" type="text" bind:value={row.user_id} />
					</div>
				</div>
				<div class="column field">
					<label class="label">Company</label>
					<div class="control">
						<!-- <input class="input" type="text" bind:value={row.company_id} /> -->
						<CompanySelection bind:selected={row.company_id} bind:selectedValue={row.company} />
					</div>
				</div>
				<div class="column field">
					<label class="label">Logo</label>
					<div class="control">
						<input class="input" type="text" bind:value={row.organizer_logo} />
					</div>
				</div>
			</div>
		</section>
		<footer class="modal-card-foot">
			<button class="button is-primary" on:click={() => submitting()}>Save</button>
		</footer>
	</div>
</div>
