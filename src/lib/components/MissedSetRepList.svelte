<script lang="ts">
  import { NumberedRepButton } from '$lib/components';
	import {DAY_3_WORKOUT_STATE, type Day3WorkoutState} from '$lib/workoutStates';

interface Props {
  missedSetReps: number[];
  completeSet: (rep: number) => void;
  workoutState: Day3WorkoutState;
}

  let { missedSetReps, completeSet, workoutState = $bindable() }: Props = $props();

  function clickedMissedRepCount() {
    console.log('missed set input');
  }

</script>

<ul class="numbered-reps-button-list">
  {#each missedSetReps as missedRep (missedRep)}
    <li>
      <NumberedRepButton
        {missedRep}
        {completeSet}
        onButtonClick={clickedMissedRepCount}
      />
    </li>
  {/each}
</ul>

<style>
  .numbered-reps-button-list {
    width: 100%;
    gap: 2rem;
    display: flex;
    justify-content: center;
    overflow-x: auto;
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

