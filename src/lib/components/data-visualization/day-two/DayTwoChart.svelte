<script lang="ts">
	import * as d3 from 'd3';

	interface Props {
		previousData?: number[];
		currentData?: number[];
	}

	let { previousData = [], currentData = [] }: Props = $props();

	let svgRef: SVGElement;

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
					let fill = 'sandybrown'; // Default color for current data
					if (previousData.length > 0 && i < prevRepCount) {
						fill = '#663399'; // Color for previous data
					}
					if (currentData.length > 0 && i >= prevRepCount && i < repCount) {
						fill = '#16a34a'; // Color for new reps in current data
					}

					bricksData.push({
						x: xOffset + i * (brickWidth + brickGap),
						y: y,
						width: brickWidth,
						height: brickHeight,
						id: `${rowIndex}-${i}`,
						fill: fill
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
						.attr('stroke', 'black')
						.attr('stroke-width', 1)
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
</style>
