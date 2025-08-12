<script lang="ts">
	import { goto } from '$app/navigation';
	import type { DayWorkout } from '$lib/strings/instructions';
	import type { ArmstrongDayNumber } from '$lib/types';

	interface Props {
		subtitle: string;
		dayWorkout?: DayWorkout;
	}

	let { subtitle = 'Not working yet', dayWorkout = undefined }: Props =
		$props();

	let workoutDayNumber: ArmstrongDayNumber | undefined = $state();
	function startWorkout() {
		workoutDayNumber = dayWorkout?.day;
		goto(`/workout/${workoutDayNumber}`);
	}

	function skipWorkout() {
		// TODO
		// add functionality to skip a workout.
	}
</script>

<div class="card recommended-workout">
	<div class="card-header">
		<div>
			<h2 class="card-title">Today's Workout</h2>
			<p class="card-subtitle">{subtitle}</p>
		</div>
		<div class="workout-type">
			<div class="workout-type-label">{dayWorkout?.name || 'Loading...'}</div>
		</div>
	</div>

	<p class="workout-description">{dayWorkout?.description || 'Loading...'}</p>

	<button onclick={startWorkout} class="start-button"> Start Workout </button>

	<button onclick={skipWorkout} class="skip-button"> Skip Workout </button>
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
</style>
