<script lang="ts">
  import { SaveWorkoutButton } from '$lib/components';

  interface Props {
    message?: string;
  }

  let { message = 'Save your progress' }: Props = $props();
</script>

<div class="heading-wrapper">
  <h3 class="save-progress-heading">{message}</h3>
</div>
<SaveWorkoutButton />

<style>
  .save-progress-heading {
    text-align: center;
  }

  .heading-wrapper {
    height: 3.75rem;
  }
</style>

