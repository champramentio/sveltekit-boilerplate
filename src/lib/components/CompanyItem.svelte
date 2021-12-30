<script>
	export let item = undefined;
</script>

<div class="custom">
	<div class="row">
		<p>{item.company_name}</p>
	</div>
</div>

<style>
	.custom {
		display: flex;
		align-items: center;
		height: 40px;
		padding-left: 20px;
		cursor: pointer;
	}

	.custom:hover {
		background-color: #eaeaea;
	}
	.row {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	p {
		display: inline-block;
	}
</style>
