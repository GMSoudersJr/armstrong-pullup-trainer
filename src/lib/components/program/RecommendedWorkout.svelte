<script lang="ts">
	import type { DayWorkout } from '$lib/strings/instructions';
	import WorkoutActionButton from './WorkoutActionButton.svelte';

	interface Props {
		currentWeekNumber?: number;
		recommendedWorkout?: DayWorkout;
		savedSkippedWorkout: boolean;
	}

	let {
		currentWeekNumber = 0,
		recommendedWorkout = undefined,
		savedSkippedWorkout = $bindable()
	}: Props = $props();
</script>

<div class="card recommended-workout">
	<div class="card-header">
		<div>
			<h2 class="card-title">Today's Workout</h2>
			<p class="card-subtitle">
				Week {currentWeekNumber}, Day {recommendedWorkout?.day || 0}
			</p>
		</div>
		<div class="workout-type">
			<div class="workout-type-label">
				{recommendedWorkout?.name || 'Loading...'}
			</div>
		</div>
	</div>

	<p class="workout-description">
		{recommendedWorkout?.description || 'Loading...'}
	</p>

	<div class="button-container">
		<WorkoutActionButton
			workoutAction={'start'}
			workoutDayNumber={recommendedWorkout?.day}
		/>

		<WorkoutActionButton
			workoutAction={'skip'}
			workoutDayNumber={recommendedWorkout?.day}
			{currentWeekNumber}
			bind:savedSkippedWorkout
		/>
	</div>
</div>

<style>
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

	.button-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
