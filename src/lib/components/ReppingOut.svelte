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
    reppingOutMessage: string;
  }

  let {
    missedSet,
    reps,
    completeSet,
    selectedGrips,
    day,
    sets,
    reppingOutMessage
  }: Props = $props();


  if (day === 3) reppingOutMessage = `Do ${reps} ${selectedGrips?.at(-1)} reps`;

  $inspect(reppingOutMessage);
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

