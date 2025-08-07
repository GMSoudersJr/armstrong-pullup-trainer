<script lang="ts">
	import { pushState } from '$app/navigation';
	import { DAY_2_WORKOUT_STATE, type WorkoutState } from '$lib';
	import {
		MaxoutSetSection,
		MissedSetSection,
		ReppingOut,
		WorkoutComplete
	} from '$lib/components';
	import { createMissedSetReps } from '$lib/utils';

	interface Props {
		showTimer: boolean;
		sets: number[];
	}

	let { showTimer = $bindable(), sets = $bindable() }: Props = $props();

	let reps = $derived(sets.length + 1);
	let reppingOutMessage = $derived(`Do ${reps} rep${reps === 1 ? '' : 's'}`);

	function completeSet(reps: number) {
		if (workoutState === DAY_2_WORKOUT_STATE.MAX_OUT) {
			sets.push(reps);
			workoutState = DAY_2_WORKOUT_STATE.COMPLETE;
		} else if (workoutState === DAY_2_WORKOUT_STATE.MISSED_SET) {
			workoutState = DAY_2_WORKOUT_STATE.MAX_OUT;
			sets.push(reps);
			showTimer = true;
			pushState('', {
				showTimer: true
			});
		} else {
			sets.push(reps);
			showTimer = true;
			pushState('', {
				showTimer: true
			});
		}
	}

	let workoutState = $state<WorkoutState>(DAY_2_WORKOUT_STATE.REPPING_OUT);
	let missedSetReps = $state<number[]>([]);

	function missedSet() {
		workoutState = DAY_2_WORKOUT_STATE.MISSED_SET satisfies WorkoutState;
		missedSetReps = createMissedSetReps(sets);
	}
</script>

{#if workoutState === DAY_2_WORKOUT_STATE.REPPING_OUT}
	<ReppingOut {reppingOutMessage} {reps} {completeSet} {missedSet} />
{:else if workoutState === DAY_2_WORKOUT_STATE.MISSED_SET}
	<MissedSetSection {missedSetReps} {completeSet} />
{:else if workoutState === DAY_2_WORKOUT_STATE.MAX_OUT}
	<MaxoutSetSection {missedSetReps} {completeSet} />
{:else if workoutState === DAY_2_WORKOUT_STATE.COMPLETE}
	<WorkoutComplete />
{/if}
