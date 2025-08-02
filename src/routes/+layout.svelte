<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { Navbar } from '$lib';
	import { onMount } from 'svelte';
	import { initializeIDB } from '$lib/indexedDB';

	// Check if current page should hide bottom navigation
	let hideBottomNav = $derived(page.route.id === '/workout');

	let { children } = $props();

	onMount(() => {
		if (typeof window !== undefined && 'indexedDB' in window) {
			initializeIDB();
		}
	});
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
