<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let page;
	export let last_page;
	export let current_page;

	$: next_page = page < last_page ? page + 1 : last_page;
	$: prev_page = page > 1 ? page - 1 : 1;
	$: more_pages = last_page === 1 ? false : true;

	function clicking(which_page) {
		dispatch('paging', { which_page });
	}
</script>

<div>
	{#if more_pages}
		<nav class="pagination" role="navigation" aria-label="pagination">
			{#if current_page !== 1}
				<a class="pagination-previous" href={null} on:click={() => clicking(prev_page)}> Previous </a>
			{/if}
			{#if current_page !== last_page}
				<a class="pagination-next" href={null} on:click={() => clicking(next_page)}> Next </a>
			{/if}
			Page :
			<ul class="pagination-list">
				{#each new Array(last_page) as page, i}
					{#if i === 0 || (i + 1 <= next_page + 1 && i + 1 >= prev_page - 1) || i + 1 === last_page}
						<li>
							<a class="pagination-link {i + 1 === current_page ? 'is-current' : ''}" aria-label="Goto page {i + 1}" href={null} on:click={() => clicking(i + 1)}>
								{i + 1}
							</a>
						</li>
					{/if}
				{/each}
			</ul>
		</nav>
	{/if}
</div>
