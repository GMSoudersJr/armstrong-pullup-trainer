<script lang="ts">
	import { GripButton } from '$lib/components';
	import type { ThreeSetsThreeGrips } from '$lib/workoutClasses.svelte';

	interface Props {
		workout: ThreeSetsThreeGrips;
	}

	let { workout }: Props = $props();
</script>

<h3 class="list-label">Select Your Grip</h3>
<ul class="grip-selector-list">
	{#each workout.grips as grip (grip)}
		<li>
			<GripButton {grip} {workout} />
		</li>
	{/each}
</ul>

<style>
	.list-label {
		text-align: center;
	}

	.grip-selector-list {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
