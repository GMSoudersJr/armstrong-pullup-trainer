<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		addCompletedDayToWorkoutsStore,
		getWeekDataForWeekNumber,
		updateThisWeekWithWorkoutNumber
	} from '$lib/indexedDB/actions';
	import type { ArmstrongDayNumber } from '$lib/types';
	import { capitalize } from '$lib/utils';
	import { createWorkoutDay, WorkoutToSave } from '$lib/workoutClasses.svelte';

	interface Props {
		workoutAction: 'start' | 'skip';
		workoutDayNumber?: ArmstrongDayNumber;
		currentWeekNumber?: number;
	}

	let { workoutAction, workoutDayNumber, currentWeekNumber }: Props = $props();

	const capitalizedAction = capitalize(workoutAction);

	async function takeAction() {
		if (workoutDayNumber) {
			if (workoutAction === 'start') {
				goto(`/workout/${workoutDayNumber}`);
			}

			if (workoutAction === 'skip' && currentWeekNumber) {
				// implement a skip function
				const workoutToSkip = createWorkoutDay(workoutDayNumber);
				workoutToSkip.setWeekNumber(currentWeekNumber);
				workoutToSkip.setId();
				workoutToSkip.markSkipped();
				const skippedWorkoutToSave: WorkoutToSave = new WorkoutToSave(
					workoutToSkip
				);

				const weekDataToUpdate =
					await getWeekDataForWeekNumber(currentWeekNumber);

				if (skippedWorkoutToSave.dayNumber !== undefined) {
					updateThisWeekWithWorkoutNumber(
						weekDataToUpdate,
						skippedWorkoutToSave.dayNumber
					);
				}
				const success =
					await addCompletedDayToWorkoutsStore(skippedWorkoutToSave);
				// Reload the current page on successful save
				if (success) location.reload();
			}
		}
	}
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
		background-color: pink;
	}
</style>
