<script lang="ts">
  import { MissedSetRepList } from "$lib/components";
	import type {Day3WorkoutState, Day4WorkoutState} from "$lib/workoutStates";

  interface Props {
    missedSetReps: number[];
    completeSet: (repsToDo: number) => void;
    workoutState: Day3WorkoutState | Day4WorkoutState;
  }

  let { missedSetReps, completeSet, workoutState = $bindable() }: Props = $props();
</script>

<h3 class="missed-rep-heading">How many did you do?</h3>
<MissedSetRepList {missedSetReps} {completeSet} bind:workoutState />

<style>
  .missed-rep-heading {
    text-align: center;
  }

</style>

