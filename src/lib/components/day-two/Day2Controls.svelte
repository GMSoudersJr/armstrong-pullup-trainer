<script lang="ts">
	import { pushState } from '$app/navigation';
	import {
		MaxoutSetSection,
		MissedSetSection,
		ReppingOut,
		WorkoutComplete
	} from '$lib/components';
	import { createMissedSetReps } from '$lib/utils';
	import { PyramidDay } from '$lib/workoutClasses.svelte';
	import { getStatesForDay } from '$lib/workoutStates';

	interface Props {
		showTimer: boolean;
		sets: number[];
	}

	const workout = new PyramidDay();
	const WORKOUT_STATES = getStatesForDay(2);

	let { showTimer = $bindable(), sets = $bindable() }: Props = $props();

	let reps = $derived(workout.currentLevel);
	let reppingOutMessage = $derived(`Do ${reps} rep${reps === 1 ? '' : 's'}`);

	function completeSet(reps: number) {
		if (workout.state === WORKOUT_STATES.MAX_OUT) {
			sets.push(reps);
			workout.addMaxOutSet(reps);
			workout.updateState(WORKOUT_STATES.COMPLETE);
		} else if (workout.state === WORKOUT_STATES.MISSED_SET) {
			sets.push(reps);
			workout.addMissedSetSet(reps);
			workout.updateState(WORKOUT_STATES.MAX_OUT);
			showTimer = true;
			pushState('', {
				showTimer: true
			});
		} else {
			sets.push(reps);
			workout.addReppingOutSet();
			showTimer = true;
			pushState('', {
				showTimer: true
			});
		}
	}

	let missedSetReps = $state<number[]>([]);

	function missedSet() {
		workout.updateState(WORKOUT_STATES.MISSED_SET);
		missedSetReps = createMissedSetReps(sets);
	}

	$inspect(workout.state);
	$inspect(workout.sets);
</script>

{#if workout.state === WORKOUT_STATES.REPPING_OUT}
	<ReppingOut {reppingOutMessage} {reps} {completeSet} {missedSet} />
{:else if workout.state === WORKOUT_STATES.MISSED_SET}
	<MissedSetSection {missedSetReps} {completeSet} />
{:else if workout.state === WORKOUT_STATES.MAX_OUT}
	<MaxoutSetSection {missedSetReps} {completeSet} />
{:else if workout.state === WORKOUT_STATES.COMPLETE}
	<WorkoutComplete {workout} />
{/if}
