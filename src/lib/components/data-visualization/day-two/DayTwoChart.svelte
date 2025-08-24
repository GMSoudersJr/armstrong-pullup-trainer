<script lang="ts">
	import * as d3 from 'd3';

	interface Props {
		data?: number[];
	}

	let { data = [] }: Props = $props();

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
		};

		const bricksData: {
			x: number;
			y: number;
			width: number;
			height: number;
			id: string;
		}[] = [];
		const brickWidth = 30;
		const brickHeight = brickWidth / 1.618;
		const brickGap = 4;
		const rowGap = 4;

		if (data.length > 0) {
			const totalPyramidHeight =
				data.length * brickHeight +
				(data.length > 1 ? data.length - 1 : 0) * rowGap;
			const yOffset = (height - totalPyramidHeight) / 2;

			data.forEach((repCount, rowIndex) => {
				const rowWidth =
					repCount * brickWidth + (repCount > 1 ? repCount - 1 : 0) * brickGap;
				const xOffset = (width - rowWidth) / 2;
				const y = yOffset + rowIndex * (brickHeight + rowGap);

				for (let i = 0; i < repCount; i++) {
					bricksData.push({
						x: xOffset + i * (brickWidth + brickGap),
						y: y,
						width: brickWidth,
						height: brickHeight,
						id: `${rowIndex}-${i}` // for object constancy
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
						.attr('fill', 'sandybrown')
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
						.attr('y', (d) => d.y),
				(exit) => exit.transition().duration(500).attr('y', height).remove()
			);
	});
</script>

<div class="chart-container">
	<h4>Day Two -- Pyramid Sets</h4>
	<svg bind:this={svgRef}></svg>
	{#if data.length === 0}
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
