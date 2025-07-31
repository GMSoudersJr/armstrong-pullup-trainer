<script lang="ts">
  import { MissedSetButton, CompleteSetButton } from '$lib/components';
	import type {GripType} from '$lib/types';

  interface Props {
    selectedGrips?: GripType[];
    missedSet: () => void;
    reps: number;
    completeSet: (repsToDo: number) => void;
    day: number;
    sets?: number[];
  }

  let { missedSet, reps, completeSet, selectedGrips, day, sets }: Props = $props();

  let reppingOutMessage: string = $derived.by(() => {
    let result: string = '';
    switch(day) {
      case 1:
        result = 'Max out!';
      break;
      case 2:
        result = `Do {reps} reps`;
      break;
      case 3:
        result = `Do ${reps} ${selectedGrips?.at(-1)} reps`;
      break;
      case 4:
        if (sets) {
          result = `Do ${reps} reps for set ${sets?.length + 1}`;
        }
      break;
      default:
        result = 'error';
      break;
    }
    return result;
  });
</script>

<section class="repping-out-section">
  <h3 class="repping-out-message">{reppingOutMessage}</h3>
  <div class="action-buttons">
    <MissedSetButton {missedSet}/>
    <CompleteSetButton repsToDo={reps} {completeSet} />
  </div>
</section>

<style>
  .repping-out-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .repping-out-message {
    text-align: center;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
  }
</style>

