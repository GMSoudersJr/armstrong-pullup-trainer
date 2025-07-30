<script lang="ts">
	import {DAY_2_WORKOUT_STATE, type WorkoutState} from "$lib";

  interface Props {
    missedRep: number;
    completeSet: (rep: number) => void;
    onButtonClick: () => void;
  }

  let { missedRep, completeSet, onButtonClick }: Props = $props();

  function handleClick(missedRep: number) {
    missedRep = missedRep;
    completeSet(missedRep);
    onButtonClick();
  }

</script>

<button
  type="button"
  class="button-missed-set-rep"
  onclick={() => handleClick(missedRep)}
>
  {missedRep}
</button>

<style>
  .button-missed-set-rep {
    min-height: 3.75rem;
    min-width: 3.75rem;
    border-radius: 0.5rem;
  }
</style>

