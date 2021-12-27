<script>
	export let defaultClass = '';
	export let loading = false;
</script>

<button class={defaultClass} on:click|preventDefault disabled={loading ? 'disabled' : ''}>
	<slot />
</button>
