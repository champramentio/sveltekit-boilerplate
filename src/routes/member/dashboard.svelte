<script>
	import { onMount } from 'svelte';

	export let session;

	let list;
	const title = 'Dashboard';

	onMount(async () => {
		const result = await fetch('/api/sender');
		list = (await result.json()).data;
	});
</script>

<sapper:head>
	<title>{title}</title>
</sapper:head>

<div class="container">
	<div class="column"><h1>Hello, Champ</h1></div>
	<div class="column">
		<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
			<tr>
				<th>Sender ID</th>
				<th>Sender Name</th>
			</tr>
			{#if list}
				{#each list as r}
					<tr>
						<td>{r.sender_id}</td>
						<td>{r.sender_name}</td>
					</tr>
				{/each}
			{/if}
		</table>
	</div>
</div>
