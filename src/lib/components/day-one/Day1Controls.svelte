<script lang="ts">
	import { pushState } from '$app/navigation';
	import { RepInputSection, WorkoutComplete } from '$lib/components';
	import { MaxEffortDay } from '$lib/workoutClasses.svelte';
	import { getStatesForDay } from '$lib/workoutStates';

	interface Props {
		sets: number[];
		showTimer: boolean;
		workout: MaxEffortDay;
	}

	const WORKOUT_STATES = getStatesForDay(1);

	let reps = $state<number>(0);
	let {
		showTimer = $bindable(),
		sets = $bindable(),
		workout = $bindable()
	}: Props = $props();

	function completeSet() {
		if (workout.canAddSet()) {
			sets.push(reps);
			workout.addSet(reps);
			if (workout.sets.length <= 4) {
				showTimer = true;
				pushState('', {
					showTimer: true
				});
			}
		} else {
			workout.updateState(WORKOUT_STATES.COMPLETE);
			return;
		}
	}

	function deleteSet() {
		sets.pop();
		workout.removeSet();
	}

	$inspect(workout.state);
	$inspect('complete?', workout.isComplete);
</script>

{#if workout.state === WORKOUT_STATES.REPPING_OUT}
	<RepInputSection bind:reps />

	<div class="set-controls">
		<button
			class="delete-button button-set-control"
			type="button"
			onclick={deleteSet}
			disabled={showTimer}
		>
			Delete Set
		</button>

		<button
			class="complete-button button-set-control"
			type="button"
			onclick={completeSet}
			disabled={showTimer}
		>
			Complete Set
		</button>
	</div>
{:else if workout.state === WORKOUT_STATES.COMPLETE}
	<WorkoutComplete {workout} />
{/if}

<style>
	.set-controls {
		display: flex;
		gap: 1rem;
	}

	.delete-button {
		width: 100%;
		background-color: darkseagreen;
		color: white;
		padding: 12px 16px;
		border-radius: 8px;
		font-weight: 500;
		border: none;
		cursor: pointer;
		transition: background-color 0.2s ease;
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
