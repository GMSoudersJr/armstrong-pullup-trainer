<!-- +page.svelte (Day Selector / Home) -->
<script lang="ts">
	import { goto } from '$app/navigation';
	// Mock data for demonstration
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	function startWorkout() {
		goto('/workout');
	}

	function skipWorkout() {
		// TODO
		// add functionality to skip a workout.
	}

	$inspect(data.mockData);
</script>

<div class="page">
	<!-- Header -->
	<div class="header">
		<h1 class="title">Armstrong Pull-up Program</h1>
		<div class="subtitle">
			Progress: {data.mockData.completedWorkouts}/{data.mockData.totalWorkouts} workouts
			completed
		</div>
	</div>

	<!-- Today's Recommended Workout -->
	<div class="card recommended-workout">
		<div class="card-header">
			<div>
				<h2 class="card-title">Today's Workout</h2>
				<p class="card-subtitle">
					Week {data.mockData.currentWeek}, Day {data.mockData.currentDay}
				</p>
			</div>
			<div class="workout-type">
				<div class="workout-type-label">Pyramid Day</div>
			</div>
		</div>

		<p class="workout-description">
			Do one pull-up, then two, then three, etc. until you reach your maximum.
			Then work your way back down to one.
		</p>

		<button onclick={startWorkout} class="start-button"> Start Workout </button>

		<button onclick={skipWorkout} class="skip-button"> Skip Workout </button>
	</div>

	<!-- Program Overview -->
	<div class="card">
		<h3 class="section-title">Program Overview</h3>

		<!-- Week Grid -->
		<div class="weeks-container">
			{#if data}
				{#each Array(6) as _, weekIndex}
					<div class="week-card">
						<h4 class="week-title">Week {weekIndex + 1}</h4>
						<div class="days-grid">
							{#each Array(5) as _, dayIndex}
								{@const isCompleted =
									weekIndex < data.mockData.currentWeek - 1 ||
									(weekIndex === data.mockData.currentWeek - 1 &&
										dayIndex < data.mockData.currentDay - 1)}
								{@const isCurrent =
									weekIndex === data.mockData.currentWeek - 1 &&
									dayIndex === data.mockData.currentDay - 1}

								<div
									class="day-item"
									class:completed={isCompleted}
									class:current={isCurrent}
								>
									Day {dayIndex + 1}
									{#if isCompleted}
										<div class="day-status">✓</div>
									{:else if isCurrent}
										<div class="day-status">📍</div>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	.page {
		padding: 16px;
		background-color: #f9fafb;
		min-height: 100vh;
	}

	.header {
		margin-bottom: 24px;
	}

	.title {
		font-size: 24px;
		font-weight: 700;
		color: #111827;
		margin: 0 0 8px 0;
	}

	.subtitle {
		font-size: 14px;
		color: #6b7280;
	}

	.card {
		background: white;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		border: 1px solid #e5e7eb;
		padding: 16px;
		margin-bottom: 24px;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
	}

	.card-title {
		font-size: 18px;
		font-weight: 600;
		color: #111827;
		margin: 0;
	}

	.card-subtitle {
		font-size: 14px;
		color: #6b7280;
		margin: 0;
	}

	.workout-type-label {
		font-size: 14px;
		color: #6b7280;
	}

	.workout-description {
		color: #374151;
		font-size: 14px;
		margin: 0 0 16px 0;
		line-height: 1.5;
	}

	.start-button {
		width: 100%;
		background-color: #2563eb;
		color: white;
		padding: 12px 16px;
		border-radius: 8px;
		font-weight: 500;
		border: none;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.start-button:hover {
		background-color: #1d4ed8;
	}

	.skip-button {
		width: 100%;
		background-color: darkgray;
		color: white;
		padding: 12px 16px;
		border-radius: 8px;
		font-weight: 500;
		border: none;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.skip-button:hover {
		background-color: yellow;
	}

	.section-title {
		font-size: 18px;
		font-weight: 600;
		color: #111827;
		margin: 0 0 16px 0;
	}

	.weeks-container {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.week-card {
		border: 1px solid #f3f4f6;
		border-radius: 8px;
		padding: 12px;
	}

	.week-title {
		font-weight: 500;
		color: #111827;
		margin: 0 0 8px 0;
	}

	.days-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 8px;
	}

	.day-item {
		text-align: center;
		padding: 8px 4px;
		border-radius: 4px;
		font-size: 14px;
		background-color: #f9fafb;
		color: #6b7280;
	}

	.day-item.completed {
		background-color: #dcfce7;
		color: #166534;
	}

	.day-item.current {
		background-color: #dbeafe;
		color: #1e40af;
		border: 2px solid #93c5fd;
	}

	.day-status {
		font-size: 12px;
		margin-top: 2px;
	}
</style>
