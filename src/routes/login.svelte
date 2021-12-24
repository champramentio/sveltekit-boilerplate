<script>
	import { goto } from '$app/navigation';
	import { toast, modal } from '$lib/modal';

	let loading = false;
	let server_captcha = '';

	let row = {
		email: 'champramentio@gmail.com',
		password: '123456',
		captcha: ''
	};

	async function handleLogin() {
		const result = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify(row)
		});

		const { success, error, data } = await result.json();

		if (error) {
			modal('error', 'error', error);
			if (data?.captcha) server_captcha = data.captcha;
		}
		if (success) {
			// toast('success', success);
			goto('/member/dashboard');
			location.reload();
		}
		loading = true;
	}
</script>

<section class="hero is-fullheight is-fullwidth">
	<div class="hero-body">
		<div class="container">
			<div class="columns is-centered">
				<div class="column is-4-desktop">
					<form on:submit|preventDefault={handleLogin} class="box" method="post">
						<h1 class="title has-text-centered">Login</h1>
						<div class="field">
							<label class="label">Email</label>
							<div class="controls">
								<input type="text" class="input" placeholder="email" bind:value={row.email} />
							</div>
						</div>
						<div class="field">
							<label class="label">Password</label>
							<div class="controls">
								<input type="password" class="input" placeholder="*******" bind:value={row.password} autocomplete="off" />
							</div>
						</div>

						{#if server_captcha}
							<div class="field">
								<label class="label">Captcha</label>
								<div class="control" style="display:flex;align-items:center">
									{@html server_captcha}
									<input class="input" id="captcha" type="text" placeholder="captcha" bind:value={row.captcha} />
								</div>
							</div>
						{/if}

						<div class="field mt-5">
							<button class="button is-success is-fullwidth">Login</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	#captcha {
		margin-left: 30px;
	}
</style>
