<script lang="ts">
	import type { TDayComplete } from '$lib/indexedDB/definitions';
	import ProgramOverview from '../data-visualization/ProgramOverview.svelte';

	interface Props {
		previousWorkouts: TDayComplete[];
	}

	let { previousWorkouts }: Props = $props();
	$inspect('previous workouts', previousWorkouts);
</script>

<div class="card">
	<h3 class="section-title">Overview</h3>

	<!-- Week Grid -->
	<ProgramOverview {previousWorkouts} />
</div>

<style>
	.card {
		background: white;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		border: 1px solid #e5e7eb;
		padding: 16px;
		margin-bottom: 24px;
	}

	.section-title {
		font-size: 18px;
		font-weight: 600;
		color: #111827;
		margin: 0 0 16px 0;
	}
</style>
