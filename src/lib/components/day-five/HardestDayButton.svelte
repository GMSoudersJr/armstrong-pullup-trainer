<script lang="ts">
	import type {ArmstrongDay} from "$lib/types";

  interface Props {
    dayNumber: ArmstrongDay;
    dayName: string;
    selectedDay?: ArmstrongDay;
  }

  let { dayName, dayNumber, selectedDay = $bindable() }: Props = $props();

  function handleDaySelection() {
    selectedDay = dayNumber;
  }
</script>

<button
  type="button"
  class="hardest-day-selector-button"
  onclick={handleDaySelection}
>
  Day {dayNumber}: {dayName}
</button>

<style>
  .hardest-day-selector-button {
    width: 100%;
    height: 3.75rem;
    border-radius: 0.5rem;
  }
</style>

