<script lang="ts">
	interface Props {
		data;
	}

	let { data }: Props = $props();
</script>

<div class="card">
	<h3 class="section-title">Program Overview</h3>

	<!-- Week Grid -->
	<div class="weeks-container">
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
