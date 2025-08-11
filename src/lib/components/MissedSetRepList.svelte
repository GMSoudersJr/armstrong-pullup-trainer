<script lang="ts">
	import { NumberedRepButton } from '$lib/components';
	import type {
		MaxTrainingSets,
		PyramidDay,
		ThreeSetsThreeGrips
	} from '$lib/workoutClasses.svelte';

	interface Props {
		completeSet: (rep: number) => void;
		workout: PyramidDay | ThreeSetsThreeGrips | MaxTrainingSets;
	}

	let { completeSet, workout }: Props = $props();
</script>

<ul class="numbered-reps-button-list">
	{#each workout.getMissedSetReps() as missedRep (missedRep)}
		<li>
			<NumberedRepButton {missedRep} {completeSet} />
		</li>
	{/each}
</ul>

<style>
	.numbered-reps-button-list {
		width: 100%;
		gap: 2rem;
		display: flex;
		justify-content: center;
		overflow-x: auto;
		list-style: none;
		margin: 0;
		padding: 0;
	}
</style>
