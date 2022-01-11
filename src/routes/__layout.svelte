<script context="module">
	export async function load({ page, session }) {
		if (/^\/member\/(.*)/.test(page.path) && !session.name) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		return {
			props: {
				session,
				path: page.path
			}
		};
	}
</script>

<script>
	import '../../node_modules/sweetalert2/dist/sweetalert2.min.css';
	import { toast, modal } from '$lib/modal';
	import Footer from '$lib/components/Footer.svelte';

	export let path, session;

	// console.log('session', path, session);
	const handleLogout = async () => {
		const result = await fetch('/api/logout', { method: 'POST' });

		const { success, error } = await result.json();

		if (error) modal('error', 'error', error);

		if (success) {
			window.location = '/login';
			toast('success', success);
		}
	};
</script>

<nav class="navbar is-light" role="navigation" aria-label="main navigation">
	<div class="container">
		<div class="navbar-brand">
			<a class="navbar-item" href="https://bulma.io">
				<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
			</a>

			<a href="/" role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
				<span aria-hidden="true" />
				<span aria-hidden="true" />
				<span aria-hidden="true" />
			</a>
		</div>

		<div id="navbarBasicExample" class="navbar-menu">
			{#if session.name}
				<div class="navbar-start">
					<a href="/member/dashboard" class="navbar-item">Dashboard</a>
					<a href="/member/sender" class="navbar-item">Sender</a>
					<a href="/member/organizer" class="navbar-item">Organizer</a>
					<a href="/member/user" class="navbar-item">User</a>
					<a href="/member/event" class="navbar-item">Event</a>
				</div>

				<div class="navbar-end">
					<div class="navbar-item">
						<div>{session.name}</div>
						<div class="buttons">
							<button on:click={handleLogout} class="button is-light">Log Out</button>
						</div>
					</div>
				</div>
			{:else}
				<div class="navbar-end">
					<div class="navbar-item">
						<a href="/login" class="navbar-item">Login</a>
						<a href="/register" class="navbar-item">Register</a>
					</div>
				</div>
			{/if}
		</div>
	</div>
</nav>

<div class="container">
	<slot />

	<footer>
		<Footer />
	</footer>
</div>
