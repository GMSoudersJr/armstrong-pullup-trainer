<script lang="ts">
	import { pushState } from '$app/navigation';
	import { DAY_3_WORKOUT_STATE, type Day3WorkoutState } from '$lib/workoutStates';
	import {
		GripSelector,
		ReppingOut,
		TrainingSetInput,
		MissedSetSection,
		WorkoutComplete
	} from '$lib/components';
	import { createMissedSetReps } from '$lib/utils';
	import type { GripType } from '$lib/types';

	let reps = $state<number>(0);

	let { showTimer = $bindable(), sets = $bindable() } = $props();

	function completeSet(reps: number) {
		sets.push(reps);
		if (sets.length === 9) {
			workoutState = DAY_3_WORKOUT_STATE.COMPLETE;
			return;
		}
		if (sets.length % 3 === 0) {
			workoutState = DAY_3_WORKOUT_STATE.GRIP_SELECTION;
		} else {
			workoutState = DAY_3_WORKOUT_STATE.REPPING_OUT;
		}
		showTimer = true;
		pushState('', {
			showTimer: true
		});
	}

	let workoutState = $state<Day3WorkoutState>('training_set_input');
	let missedSetReps = $state<number[]>([]);

	function missedSet() {
		missedSetReps = createMissedSetReps(reps);
		workoutState = DAY_3_WORKOUT_STATE.MISSED_SET;
	}

	let selectedGrips = $state<GripType[]>([]);
	let reppingOutMessage = $derived<string>(`Do ${reps} ${selectedGrips?.at(-1)} reps`);
</script>

{#if workoutState === DAY_3_WORKOUT_STATE.TRAINING_SET_INPUT}
	<TrainingSetInput bind:reps bind:workoutState day={3} />
{:else if workoutState === DAY_3_WORKOUT_STATE.GRIP_SELECTION}
	<GripSelector {selectedGrips} bind:workoutState />
{:else if workoutState === DAY_3_WORKOUT_STATE.REPPING_OUT}
	<ReppingOut {missedSet} {reps} {completeSet} {reppingOutMessage} />
{:else if workoutState === DAY_3_WORKOUT_STATE.MISSED_SET}
	<MissedSetSection {missedSetReps} {completeSet} />
{:else if workoutState === DAY_3_WORKOUT_STATE.COMPLETE}
	<WorkoutComplete />
{/if}

<style></style>
