<script>
	import { modal } from '$lib/modal';

	let row = {};
	let company_id;
	let isOpen = false;
	$: if (isOpen) {
		fetching();
	}

	export function showModal(id) {
		company_id = id;
		isOpen = true;
	}

	function closeModal() {
		isOpen = false;
	}

	async function fetching() {
		let result = await fetch(`/api/organizer/${company_id}`);
		const { success, error, data } = await result.json();

		if (error) modal('error', 'error', error);
		if (success) row = data;
	}
</script>

<div class="modal {isOpen ? 'is-active' : ''}">
	<div class="modal-background" />
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{row.organizer_name}</p>
			<button class="delete" aria-label="close" on:click={() => closeModal()} />
		</header>
		<section class="modal-card-body">
			<div class="columns is-desktop">
				<table class="table is-narrow is-hoverable is-fullwidth">
					<tr>
						<td>Name</td>
						<td>{row.organizer_name}</td>
					</tr>
					<tr>
						<td>Email</td>
						<td>{row.organizer_email}</td>
					</tr>
					<tr>
						<td>Address</td>
						<td>{row.organizer_address}</td>
					</tr>
					<tr>
						<td>Zip</td>
						<td>{row.organizer_zip}</td>
					</tr>
				</table>
			</div>
		</section>
		<footer class="modal-card-foot">
			<button class="button" on:click={() => closeModal()}>Close</button>
		</footer>
	</div>
</div>
