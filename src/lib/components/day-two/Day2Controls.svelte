<script lang="ts">
	import { pushState } from '$app/navigation';
	import {
		MaxoutSetSection,
		MissedSetSection,
		ReppingOut,
		WorkoutComplete
	} from '$lib/components';
	import { createMissedSetReps } from '$lib/utils';
	import { getStatesForDay, type Day2WorkoutState } from '$lib/workoutStates';

	interface Props {
		showTimer: boolean;
		sets: number[];
	}

	let { showTimer = $bindable(), sets = $bindable() }: Props = $props();

	let reps = $derived(sets.length + 1);
	let reppingOutMessage = $derived(`Do ${reps} rep${reps === 1 ? '' : 's'}`);

	function completeSet(reps: number) {
		if (workoutState === getStatesForDay(2).MAX_OUT) {
			sets.push(reps);
			workoutState = getStatesForDay(2).COMPLETE;
		} else if (workoutState === getStatesForDay(2).MISSED_SET) {
			workoutState = getStatesForDay(2).MAX_OUT;
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

	let workoutState = $state<Day2WorkoutState>(getStatesForDay(2).REPPING_OUT);
	let missedSetReps = $state<number[]>([]);

	function missedSet() {
		workoutState = getStatesForDay(2).MISSED_SET;
		missedSetReps = createMissedSetReps(sets);
	}
</script>

{#if workoutState === getStatesForDay(2).REPPING_OUT}
	<ReppingOut {reppingOutMessage} {reps} {completeSet} {missedSet} />
{:else if workoutState === getStatesForDay(2).MISSED_SET}
	<MissedSetSection {missedSetReps} {completeSet} />
{:else if workoutState === getStatesForDay(2).MAX_OUT}
	<MaxoutSetSection {missedSetReps} {completeSet} />
{:else if workoutState === getStatesForDay(2).COMPLETE}
	<WorkoutComplete />
{/if}
