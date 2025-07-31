<script lang="ts">
  interface Props {
    dayNumber: number;
    dayName: string;
    selectedDay?: number;
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
  }
</style>

