<script lang="ts">
	import { pushState } from '$app/navigation';
	import { RepInputSection, WorkoutComplete } from '$lib/components';
	import { MaxEffortDay } from '$lib/workoutClasses.svelte';
	import { DAY_1_WORKOUT_STATE, getStatesForDay } from '$lib/workoutStates';

	interface Props {
		showTimer: boolean;
		workout: MaxEffortDay;
	}

	const WORKOUT_STATES = getStatesForDay(1);

	let reps = $state<number>(0);
	let { showTimer = $bindable(), workout = $bindable() }: Props = $props();

	function completeSet() {
		if (workout.canAddSet()) {
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
		workout.removeSet();
	}
</script>

{#if workout.state === DAY_1_WORKOUT_STATE.REPPING_OUT}
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
{:else if workout.state === DAY_1_WORKOUT_STATE.COMPLETE}
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
