<script lang="ts">
  import { pushState } from "$app/navigation";
	import {DAY_2_WORKOUT_STATE, type WorkoutState} from "$lib";
  import {
	CompleteSetButton,
    MaxoutSetRepList,
    MissedSetButton,
    MissedSetRepList,
    SaveWorkoutButton
  } from "$lib/components";
	import {createMissedSetReps} from "$lib/utils";

  interface Props {
    showTimer: boolean;
    sets: number[];
  }

  let { showTimer = $bindable(), sets = $bindable() }: Props = $props();

  let repsToDo = $derived(sets.length + 1);
  let ascendingMessage = $derived(`Do ${repsToDo} rep${repsToDo === 1 ?'' : 's'}`);

  const MESSAGES = {
    ASCENDING: 'ascending',
    MISSED_SET: 'How many did you do?',
    MAX_OUT: 'Maxout!',
    COMPLETE: 'Save your progress!',
  }


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
  };

  let workoutState = $state<WorkoutState>(DAY_2_WORKOUT_STATE.ASCENDING);
  let missedSetReps = $state<number[]>([]);

  function missedSet() {
    workoutState = DAY_2_WORKOUT_STATE.MISSED_SET satisfies WorkoutState;
    missedSetReps = createMissedSetReps(sets);
  }

</script>

<div class="set-info">
  {#if workoutState === DAY_2_WORKOUT_STATE.ASCENDING}
    <h3>{ascendingMessage}</h3>
    {:else if workoutState === DAY_2_WORKOUT_STATE.MISSED_SET}
    <h3>{MESSAGES.MISSED_SET}</h3>
    {:else if workoutState === DAY_2_WORKOUT_STATE.MAX_OUT}
    <h3>{MESSAGES.MAX_OUT}</h3>
    {:else if workoutState === DAY_2_WORKOUT_STATE.COMPLETE}
    <h3>{MESSAGES.COMPLETE}</h3>
  {/if}
</div>

<div class="set-controls">
  {#if workoutState === DAY_2_WORKOUT_STATE.ASCENDING}
    <MissedSetButton {missedSet}/>
    <CompleteSetButton {repsToDo} {completeSet} />
  {:else if workoutState === DAY_2_WORKOUT_STATE.MISSED_SET}
    <MissedSetRepList {missedSetReps} {completeSet} />
  {:else if workoutState === DAY_2_WORKOUT_STATE.MAX_OUT}
    <MaxoutSetRepList {missedSetReps} {completeSet} />
  {:else if workoutState === DAY_2_WORKOUT_STATE.COMPLETE}
    <SaveWorkoutButton />
  {/if}
</div>

<style>

  .set-controls {
    display: flex;
    gap: 1rem;
  }

  .set-info {
    display: flex;
    justify-content: center;
    height: 3.75rem;
  }
</style>

