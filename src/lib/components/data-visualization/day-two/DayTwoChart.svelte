<script lang="ts">
	import * as d3 from 'd3';

	interface Props {
		previousData?: number[];
		currentData?: number[];
	}

	let { previousData = [], currentData = [] }: Props = $props();

	let svgRef: SVGElement;

	const colors = {
		current: '#16a34a',
		previous: '#663399',
		missed: '#ffffff'
	};

	$effect(() => {
		if (!svgRef) return;

		const svg = d3.select(svgRef);
		const width = 600;
		const height = width / 1.618;

		svg.attr('viewBox', `0 0 ${width} ${height}`);

		type BrickData = {
			x: number;
			y: number;
			width: number;
			height: number;
			id: string;
			fill: string;
			stroke: string;
		};

		const bricksData: BrickData[] = [];
		const brickWidth = 30;
		const brickHeight = brickWidth / 1.618;
		const brickGap = 4;
		const rowGap = 4;

		const data = currentData.length > 0 ? currentData : previousData;

		if (data.length > 0) {
			const totalPyramidHeight =
				data.length * brickHeight +
				(data.length > 1 ? data.length - 1 : 0) * rowGap;
			const yOffset = (height - totalPyramidHeight) / 2;

			data.forEach((repCount, rowIndex) => {
				const prevRepCount = previousData[rowIndex] ?? 0;
				const totalReps = Math.max(repCount, prevRepCount);
				const rowWidth =
					totalReps * brickWidth +
					(totalReps > 1 ? totalReps - 1 : 0) * brickGap;
				const xOffset = (width - rowWidth) / 2;
				const y = yOffset + rowIndex * (brickHeight + rowGap);

				for (let i = 0; i < totalReps; i++) {
					let fill = colors.current;
					let stroke = 'black';

					if (i < currentData[rowIndex]) {
						fill = colors.current;
					} else if (i < prevRepCount) {
						fill = colors.missed;
						stroke = colors.previous;
					}

					if (currentData.length === 0 && previousData.length > 0) {
						fill = colors.previous;
						stroke = 'black';
					}

					bricksData.push({
						x: xOffset + i * (brickWidth + brickGap),
						y: y,
						width: brickWidth,
						height: brickHeight,
						id: `${rowIndex}-${i}`,
						fill: fill,
						stroke: stroke
					});
				}
			});
		}

		svg
			.selectAll('rect.brick')
			.data(bricksData, (d) => (d as BrickData).id)
			.join(
				(enter) =>
					enter
						.append('rect')
						.attr('class', 'brick')
						.attr('x', (d) => d.x)
						.attr('y', height) // start from bottom
						.attr('width', (d) => d.width)
						.attr('height', (d) => d.height)
						.attr('fill', (d) => d.fill)
						.attr('stroke', (d) => d.stroke)
						.attr('stroke-width', 2)
						.attr('rx', 3)
						.attr('ry', 3)
						.transition()
						.duration(500)
						.attr('y', (d) => d.y),
				(update) =>
					update
						.transition()
						.duration(500)
						.attr('x', (d) => d.x)
						.attr('y', (d) => d.y)
						.attr('fill', (d) => d.fill),
				(exit) => exit.transition().duration(500).attr('y', height).remove()
			);
	});
</script>

<div class="chart-container">
	<h4>Day Two -- Pyramid Sets</h4>
	<svg bind:this={svgRef}></svg>
	<div class="legend">
		<div class="legend-item">
			<span class="color-box" style="background-color: {colors.previous};"
			></span>
			Previous Workout
		</div>
		<div class="legend-item">
			<span class="color-box" style="background-color: {colors.current};"
			></span>
			Current Workout
		</div>
		<div class="legend-item">
			<span
				class="color-box"
				style="background-color: {colors.missed}; border: 2px solid {colors.previous};"
			></span>
			Previous Reps (Not Met)
		</div>
	</div>
	{#if currentData.length === 0 && previousData.length === 0}
		<p class="instructions">
			Add sets to your pyramid workout to see your progress.
		</p>
	{/if}
</div>

<style>
	.chart-container {
		width: 100%;
		max-width: 400px;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	svg {
		width: 100%;
		height: auto;
	}
	.legend {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1rem;
	}
	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.color-box {
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 4px;
	}
</style>
