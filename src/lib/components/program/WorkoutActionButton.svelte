<script lang="ts">
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import {
		getWeekDataForWeekNumber,
		updateThisWeekWithWorkoutNumber
	} from '$lib/indexedDB/actions';
	import type { ArmstrongDayNumber } from '$lib/types';
	import { SkippedWorkout, WorkoutToSave } from '$lib/workoutClasses.svelte';

	interface Props {
		workoutAction: 'start' | 'skip';
		workoutDayNumber?: ArmstrongDayNumber;
		currentWeekNumber?: number;
	}

	let { workoutAction, workoutDayNumber, currentWeekNumber }: Props = $props();

	async function takeAction() {
		if (workoutDayNumber) {
			if (workoutAction === 'start') {
				goto(`/workout/${workoutDayNumber}`);
			}

			if (workoutAction === 'skip' && currentWeekNumber) {
				// implement a skip function
				const skippedWorkout: SkippedWorkout = new SkippedWorkout(
					workoutDayNumber
				);
				skippedWorkout.setWeekNumber(currentWeekNumber);
				skippedWorkout.setId();
				skippedWorkout.markComplete();
				const workoutToSave: WorkoutToSave = new WorkoutToSave(skippedWorkout);

				const weekDataToUpdate =
					await getWeekDataForWeekNumber(currentWeekNumber);

				if (workoutToSave.dayNumber !== undefined) {
					updateThisWeekWithWorkoutNumber(
						weekDataToUpdate,
						workoutToSave.dayNumber
					);
				}
				invalidateAll();
				try {
					goto('/');
				} catch (error) {
					console.log(error);
				}
			}
		}
	}

	const capitalizedAction =
		workoutAction.charAt(0).toUpperCase() + workoutAction.slice(1);
</script>

<button type="button" onclick={takeAction} class={`${workoutAction}-button`}>
	{capitalizedAction} Workout
</button>

<style>
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
