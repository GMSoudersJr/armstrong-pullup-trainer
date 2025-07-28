<!-- workout/+page.svelte (Daily Workout) -->
<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import type { PageProps } from './$types';
  import {
    Day1Controls,
    Day2Controls,
    Day3Controls,
    Day4Controls,
    TimerModal
  } from '$lib/components';

  let { data }: PageProps = $props();

  console.log(data);

  function goBack() {
    goto('/');
  }

  let sets: number[] = $state([])

  let showTimer = $state(false);
</script>

<div class="workout-page">
  <!-- Header with back button -->
  <section class="workout-header">
    <div class="header-content">
      <button onclick={goBack} class="back-button" aria-label="back">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>
      <div>
        <h1 class="workout-title">Week 1, Day {data.workoutData.day}</h1>
        <p class="workout-subtitle">{data.workoutData.name}</p>
      </div>
    </div>
  </section>

  <!-- Workout Data Visualization -->
  <section class="workout-data-visualization">
    <h3>
      Data Visualization Goes Here
    </h3>
    <h4>
      {#if data.workoutData.day !== 5}
        Sets: {sets}
      {/if}
    </h4>
  </section>

  <!-- Workout controls -->
  <section class="workout-controls">
    {#if data.workoutData.day === 1}
      <Day1Controls bind:showTimer bind:sets/>
    {:else if data.workoutData.day === 2}
      <Day2Controls bind:showTimer />
    {:else if data.workoutData.day === 3}
      <Day3Controls bind:showTimer />
    {:else if data.workoutData.day === 4}
      <Day4Controls bind:showTimer />
    {/if}
  </section>
</div>

{#if page.state.showTimer}
  <TimerModal
    onClose={() =>{
     history.back()
     showTimer = false;
    }}
    bind:isOpen={showTimer}
    title="Timer Modal"
  >
    <p>Timer goes here</p>
</TimerModal>
{/if}

<style>
  .workout-page {
    min-height: 100vh;
    background-color: #f9fafb;
    display: flex;
    flex-direction: column;
  }

  .workout-header {
    background-color: #2563eb;
    color: white;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .header-content {
    display: flex;
    align-items: center;
  }

  .back-button {
    margin-right: 12px;
    padding: 4px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }

  .back-button:hover {
    background-color: #1d4ed8;
  }

  .workout-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  .workout-subtitle {
    font-size: 14px;
    opacity: 0.9;
    margin: 0;
  }

  .workout-data-visualization {
    flex: 1;
    display: flex;
    border: 1px solid orange;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px;
    text-align: center;
  }

  .rep-display {
    font-size: 96px;
    font-weight: 700;
    color: #2563eb;
    margin-bottom: 16px;
    line-height: 1;
  }

  .rep-label {
    font-size: 18px;
    color: #374151;
    margin-bottom: 32px;
  }

  .set-info {
    font-size: 14px;
    color: #6b7280;
  }

  .workout-controls {
    display: flex;
    flex-direction: column;
    border: 1px solid green;
    padding: 1rem;
    gap: 1rem;
  }
</style>
