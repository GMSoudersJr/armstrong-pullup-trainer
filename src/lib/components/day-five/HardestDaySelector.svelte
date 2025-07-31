<script lang="ts">
  import { initialWorkoutData } from "$lib/initialWorkoutData";
	import type {ArmstrongDay} from "$lib/types";
	import HardestDayButton from "./HardestDayButton.svelte";
  const previousWorkouts = initialWorkoutData.slice(0, -1);

  let selectedDay = $state<ArmstrongDay>();
  $inspect(selectedDay);
</script>

<ul class="hardest-day-list">
{#each previousWorkouts as workoutDay (workoutDay.workoutData.day) }
  <li>
    <HardestDayButton
      dayNumber={workoutDay.workoutData.day}
      dayName={workoutDay.workoutData.name}
      bind:selectedDay
    />
  </li>
{/each}
</ul>

<style>
  .hardest-day-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

</style>

