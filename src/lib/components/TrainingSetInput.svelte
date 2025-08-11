<script lang="ts">
	import { DAY_3_WORKOUT_STATE, DAY_4_WORKOUT_STATE } from '$lib/workoutStates';
	import { RepInputSection } from '$lib/components';
	import type {
		MaxTrainingSets,
		ThreeSetsThreeGrips
	} from '$lib/workoutClasses.svelte';

	interface Props {
		reps: number;
		workout: ThreeSetsThreeGrips | MaxTrainingSets;
	}

	let { reps = $bindable(), workout }: Props = $props();

	function confirmTrainingSet() {
		workout.setTrainingSet(reps);
		if (workout.dayNumber === 3)
			workout.updateState(DAY_3_WORKOUT_STATE.GRIP_SELECTION);
		if (workout.dayNumber === 4)
			workout.updateState(DAY_4_WORKOUT_STATE.REPPING_OUT);
	}

	let disabled = $derived(reps === 0);
</script>

<RepInputSection bind:reps />
<div class="set-controls">
	<button
		type="button"
		class="complete-button button-set-control"
		onclick={confirmTrainingSet}
		{disabled}
	>
		Confirm Training Set
	</button>
</div>

<style>
	.set-controls {
		display: flex;
		gap: 1rem;
	}

	.complete-button {
		width: 100%;
		background-color: #16a34a;
		color: white;
		padding: 12px 16px;
		border-radius: 8px;
		font-weight: 500;
		border: none;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.complete-button:hover {
		background-color: #15803d;
	}
</style>
