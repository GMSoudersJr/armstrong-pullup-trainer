<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { Navbar } from '$lib';

	// Check if current page should hide bottom navigation
	let hideBottomNav = $derived(page.route.id === '/workout');

	let { children } = $props();
</script>

<main class="layout">
	<!-- Main content area -->
	<div class="content" class:with-nav={!hideBottomNav}>
		{@render children()}
	</div>
	{#if !hideBottomNav}
		<Navbar />
	{/if}
</main>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content {
		flex: 1;
	}

	.content.with-nav {
		padding-bottom: 64px; /* Space for bottom nav */
	}
</style>
