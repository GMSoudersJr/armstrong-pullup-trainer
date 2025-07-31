<script lang="ts">
  import { HardestDaySelector } from "$lib/components";
</script>

<div>
  <div class="heading-wrapper">
  <h3 class="day-control-heading">Select your hardest day!</h3>
  </div>
  <!-- This will be the interface to select which day was that hardest -->
  <HardestDaySelector />
</div>

<style>
  .heading-wrapper {
    height: 3.75rem;
  }
  .day-control-heading {
    text-align: center;
  }
</style>

