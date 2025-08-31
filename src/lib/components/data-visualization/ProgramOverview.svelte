<script lang="ts">
	import type { TDayComplete } from '$lib/indexedDB/definitions';
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	// Define the structure for workout data
	interface WorkoutData {
		week: number;
		day: number;
		completed: boolean;
		date?: number; // Optional date field for future use
	}

	// Component props - previousWorkouts contains the workout completion data
	interface Props {
		previousWorkouts: TDayComplete[];
	}

	let { previousWorkouts }: Props = $props();

	// Reactive state for managing component data
	let svgElement: SVGSVGElement;
	let containerWidth = $state(0);

	// Configuration constants for the heatmap layout
	const DAYS_PER_WEEK = 5; // D1-D5
	const SQUARE_SIZE = 40; // Larger squares for better mobile touch targets
	const SQUARE_GAP = 4; // Slightly larger gap for better visual separation
	const MARGIN = { top: 50, right: 25, bottom: 25, left: 50 }; // Increased margins for larger labels
	const MAX_CONTAINER_WIDTH = 600; // Increased max width to accommodate larger squares

	// Calculate derived values for layout
	const chartWidth = DAYS_PER_WEEK * (SQUARE_SIZE + SQUARE_GAP) - SQUARE_GAP;
	const totalWidth = chartWidth + MARGIN.left + MARGIN.right;

	// Determine the number of weeks based on the data
	const maxWeek = $derived(
		previousWorkouts.length > 0
			? Math.max(...previousWorkouts.map((d) => d.weekNumber))
			: 4 // Default to 4 weeks if no data
	);

	const chartHeight = $derived(
		maxWeek * (SQUARE_SIZE + SQUARE_GAP) - SQUARE_GAP
	);
	const totalHeight = $derived(chartHeight + MARGIN.top + MARGIN.bottom);

	// Create a map for quick lookup of workout data by week and day
	const workoutMap = $derived(() => {
		const map = new Map<string, WorkoutData>();
		previousWorkouts.forEach((previousWorkout) => {
			const key = `${previousWorkout.weekNumber}-${previousWorkout.dayNumber}`;
			map.set(key, {
				week: previousWorkout.weekNumber,
				day: previousWorkout.dayNumber,
				date: previousWorkout.date,
				completed: previousWorkout.wasCompleted
			});
		});
		return map;
	});

	// Generate complete grid data including empty cells
	const gridData = $derived(() => {
		const data: (WorkoutData & { isEmpty: boolean })[] = [];

		// Create grid for all weeks and days, filling in actual data where available
		for (let week = 1; week <= maxWeek; week++) {
			for (let day = 1; day <= DAYS_PER_WEEK; day++) {
				const key = `${week}-${day}`;
				const workout = workoutMap().get(key);

				if (workout) {
					data.push({ ...workout, isEmpty: false });
				} else {
					// Create empty cell for missing data
					data.push({
						week,
						day,
						completed: false,
						isEmpty: true
					});
				}
			}
		}

		return data;
	});

	// Color scale for different workout states
	const colorScale = d3
		.scaleOrdinal<string, string>()
		.domain(['empty', 'skipped', 'completed'])
		.range(['#ebedf0', '#ff6b6b', '#51cf66']); // Light gray, red, green

	// Handle square click events
	function handleSquareClick(workout: WorkoutData & { isEmpty: boolean }) {
		console.log('Clicked workout:', workout);
		// TODO: Implement modal or detail view for workout data
	}

	// Initialize D3 visualization when component mounts
	onMount(() => {
		// Set up resize observer for responsive behavior
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				containerWidth = entry.contentRect.width;
			}
		});

		if (containerElement) {
			resizeObserver.observe(containerElement);
		}

		return () => {
			resizeObserver.disconnect();
		};
	});

	// Main rendering function using D3.js
	function renderHeatmap() {
		if (!svgElement) return;

		// Clear any existing content
		d3.select(svgElement).selectAll('*').remove();

		// Create the main SVG group with margins
		const svg = d3.select(svgElement);
		const g = svg
			.append('g')
			.attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`);

		// Add day labels (D1, D2, D3, D4, D5) at the top
		g.selectAll('.day-label')
			.data(Array.from({ length: DAYS_PER_WEEK }, (_, i) => i + 1))
			.enter()
			.append('text')
			.attr('class', 'day-label')
			.attr('x', (_, i) => i * (SQUARE_SIZE + SQUARE_GAP) + SQUARE_SIZE / 2)
			.attr('y', -20) // Adjusted for larger squares and font
			.attr('text-anchor', 'middle')
			.style('font-size', `${Math.max(14, SQUARE_SIZE * 0.35)}px`) // Responsive font size
			.style('font-weight', '600') // Bolder weight
			.style('fill', '#374151')
			.text((d) => `D${d}`);

		// Add week labels (W1, W2, W3, etc.) on the left
		g.selectAll('.week-label')
			.data(Array.from({ length: maxWeek }, (_, i) => i + 1))
			.enter()
			.append('text')
			.attr('class', 'week-label')
			.attr('x', -20) // Adjusted for larger squares
			.attr('y', (_, i) => i * (SQUARE_SIZE + SQUARE_GAP) + SQUARE_SIZE / 2)
			.attr('text-anchor', 'end')
			.attr('dominant-baseline', 'middle')
			.style('font-size', `${Math.max(14, SQUARE_SIZE * 0.35)}px`) // Responsive font size
			.style('font-weight', '600') // Bolder weight
			.style('fill', '#374151')
			.text((d) => `W${d}`);

		// Create the workout squares
		const squares = g
			.selectAll('.workout-square')
			.data(gridData)
			.join(
				(enter) =>
					enter
						.append('rect')
						.attr('class', 'workout-square')
						.attr('x', (d) => (d.day - 1) * (SQUARE_SIZE + SQUARE_GAP))
						.attr('y', (d) => (d.week - 1) * (SQUARE_SIZE + SQUARE_GAP))
						.attr('width', SQUARE_SIZE)
						.attr('height', SQUARE_SIZE)
						.attr('rx', SQUARE_SIZE * 0.1), // Responsive border radius
				(update) => update,
				(exit) => exit.remove()
			)
			.style('cursor', 'pointer')
			.style('stroke', '#e5e7eb')
			.style('stroke-width', 1)
			.style('fill', (d) => {
				if (d.isEmpty) return colorScale('empty');
				return d.completed ? colorScale('completed') : colorScale('skipped');
			})
			// Add hover effects
			.on('mouseover', function () {
				d3.select(this)
					.transition()
					.duration(150)
					.style('opacity', 0.8)
					.style('stroke-width', 2);
			})
			.on('mouseout', function () {
				d3.select(this)
					.transition()
					.duration(150)
					.style('opacity', 1)
					.style('stroke-width', 1);
			})
			// Handle click events
			.on('click', function (_, d) {
				handleSquareClick(d);

				// Visual feedback for click
				d3.select(this)
					.transition()
					.duration(100)
					.style('transform', 'scale(0.95)')
					.transition()
					.duration(100)
					.style('transform', 'scale(1)');
			});

		// Add tooltips on hover (simple title attribute for now)
		squares.append('title').text((d) => {
			if (d.isEmpty) return `Week ${d.week}, Day ${d.day}: No data`;
			return `Week ${d.week}, Day ${d.day}: ${d.completed ? 'Completed' : 'Skipped'}`;
		});
	}

	let containerElement: HTMLDivElement;

	// Re-render when data changes or container size changes
	$effect(() => {
		if (svgElement && gridData() && containerWidth > 0) {
			renderHeatmap();
		}
	});
</script>

<!--
  Main container with responsive sizing
  Uses ResizeObserver to track container width for responsive square sizing
-->
<div class="heatmap-container" bind:this={containerElement}>
	<!-- Legend to explain the color coding -->
	<div class="legend">
		<div class="legend-item">
			<div class="legend-square" style="background-color: #ebedf0;"></div>
			<span>No data</span>
		</div>
		<div class="legend-item">
			<div class="legend-square" style="background-color: #ff6b6b;"></div>
			<span>Skipped</span>
		</div>
		<div class="legend-item">
			<div class="legend-square" style="background-color: #51cf66;"></div>
			<span>Completed</span>
		</div>
	</div>
	<div class="heatmap-wrapper">
		<svg
			bind:this={svgElement}
			width={totalWidth}
			height={totalHeight}
			viewBox={`0 0 ${totalWidth} ${totalHeight}`}
			class="workout-heatmap"
		>
			<!-- D3 will populate this SVG -->
		</svg>
	</div>
</div>

<style>
	/* Container styling for responsive layout */
	.heatmap-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
		max-width: 100%;
		margin: 0 auto;
	}

	/* Wrapper to control maximum size while maintaining responsiveness */
	.heatmap-wrapper {
		width: 100%; /* Always take full width of container */
		display: flex;
		justify-content: center;
	}

	/* SVG styling for proper scaling */
	.workout-heatmap {
		max-width: 100%;
		height: auto;
		display: block;
	}

	/* Legend styling */
	.legend {
		display: flex;
		gap: 16px;
		margin-top: 16px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		color: #374151;
	}

	.legend-square {
		width: 12px;
		height: 12px;
		border-radius: 2px;
		border: 1px solid #e5e7eb;
	}

	/* Mobile-first responsive design */
	@media (max-width: 480px) {
		.heatmap-container {
			padding: 12px; /* Reduced padding on small screens for more space */
		}

		.legend {
			gap: 8px; /* Tighter spacing on mobile */
		}

		.legend-item {
			font-size: 11px;
		}
	}

	/* Prevent squares from getting too large on wide screens */
	@media (min-width: 768px) {
		.heatmap-container {
			max-width: 600px; /* Constrain container on larger screens */
			margin: 0 auto;
		}
	}
</style>
