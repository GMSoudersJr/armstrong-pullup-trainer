<script lang="ts">
  import type { GripType } from '$lib';
  import { GripButton } from '$lib/components';
	import type { Day3WorkoutState } from '$lib/workoutStates';

  interface Props {
    selectedGrips: GripType[];
    workoutState: Day3WorkoutState;
  }

  const grips: GripType[] = ['neutral', 'pronated', 'supinated', 'close', 'wide'];

  let { selectedGrips = $bindable(), workoutState = $bindable() }: Props = $props();
</script>

<h3 class="list-label">Select Your Grip</h3>
<ul class="grip-selector-list">
  {#each grips as grip (grip)}
  <li>
    <GripButton {grip} {selectedGrips} bind:workoutState/>
  </li>
  {/each}
</ul>

<style>
  .list-label {
    text-align: center;
  }

  .grip-selector-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>

