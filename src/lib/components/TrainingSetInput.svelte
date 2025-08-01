<script lang="ts">
	import {
		DAY_3_WORKOUT_STATE,
		DAY_4_WORKOUT_STATE,
		type Day3WorkoutState,
		type Day4WorkoutState
	} from '$lib/workoutStates';
	import { RepInputSection } from '$lib/components';

	interface Props {
		reps: number;
		workoutState: Day3WorkoutState | Day4WorkoutState;
		day: number;
	}

	let { reps = $bindable(), workoutState = $bindable(), day }: Props = $props();

	function confirmTrainingSet() {
		if (day === 3) workoutState = DAY_3_WORKOUT_STATE.GRIP_SELECTION;
		if (day === 4) workoutState = DAY_4_WORKOUT_STATE.REPPING_OUT;
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
