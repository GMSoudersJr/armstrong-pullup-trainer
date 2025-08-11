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
	import { DAY_2_WORKOUT_STATE } from '$lib/workoutStates';

	interface Props {
		showTimer: boolean;
		sets: number[];
		workout: PyramidDay;
	}

	let {
		showTimer = $bindable(),
		sets = $bindable(),
		workout = $bindable()
	}: Props = $props();

	let reps = $derived(workout.currentLevel);
	let reppingOutMessage = $derived(`Do ${reps} rep${reps === 1 ? '' : 's'}`);

	function completeSet(reps: number) {
		if (workout.state === DAY_2_WORKOUT_STATE.MAX_OUT) {
			sets.push(reps);
			workout.addMaxOutSet(reps);
			workout.updateState(DAY_2_WORKOUT_STATE.COMPLETE);
		} else if (workout.state === DAY_2_WORKOUT_STATE.MISSED_SET) {
			sets.push(reps);
			workout.addMissedSetSet(reps);
			workout.updateState(DAY_2_WORKOUT_STATE.MAX_OUT);
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
		workout.updateState(DAY_2_WORKOUT_STATE.MISSED_SET);
		workout.setMissedSetReps();
		missedSetReps = createMissedSetReps(sets);
	}
</script>

{#if workout.state === DAY_2_WORKOUT_STATE.REPPING_OUT}
	<ReppingOut {reppingOutMessage} {reps} {completeSet} {missedSet} />
{:else if workout.state === DAY_2_WORKOUT_STATE.MISSED_SET}
	<MissedSetSection {workout} {completeSet} />
{:else if workout.state === DAY_2_WORKOUT_STATE.MAX_OUT}
	<MaxoutSetSection {missedSetReps} {completeSet} />
{:else if workout.state === DAY_2_WORKOUT_STATE.COMPLETE}
	<WorkoutComplete {workout} />
{/if}
