<script lang="ts">
	import * as d3 from 'd3';

	interface Props {
		data?: number[];
	}

	let { data = [] }: Props = $props();

	let svgRef: SVGElement;

	$effect(() => {
		if (svgRef && data.length > 0) {
			const width = 600;
			const height = width / 1.618;

			const svg = d3.select(svgRef);

			svg.attr('viewBox', `0 0 ${width} ${height}`);

			const margin = { top: 20, right: 20, bottom: 30, left: 40 };

			const x = d3
				.scaleBand()
				.range([margin.left, width - margin.right])
				.padding(0.25)
				.domain(['1', '2', '3', '4', '5']);

			const y = d3
				.scaleLinear()
				.range([height - margin.bottom, margin.top])
				.domain([0, d3.max(data) ?? 1]);

			svg
				.append('g')
				.attr('transform', `translate(0, ${height - margin.bottom})`)
				.call(d3.axisBottom(x))
				.selectAll('text')
				.style('font-size', '16px')
				.attr('dy', '1em');

			svg
				.selectAll('.bar')
				.data(data)
				.enter()
				.append('rect')
				.attr('class', 'bar')
				.attr('x', (_, i) => x((i + 1).toString()) ?? 0)
				.attr('width', x.bandwidth())
				.attr('height', () => 0)
				.attr('y', () => height - margin.bottom)
				.transition()
				.delay(300)
				.duration(300)
				.attr('height', (d) => height - margin.bottom - y(d))
				.attr('y', (d) => y(d))
				.attr('fill', '#16a34a')
				.attr('rx', 8)
				.attr('ry', 8);

			svg
				.selectAll('.text')
				.data(data)
				.enter()
				.append('text')
				.attr('class', 'label')
				.attr('x', (_, i) => (x((i + 1).toString()) ?? 0) + x.bandwidth() / 2)
				.attr('y', (d) => y(d) + 30)
				.attr('text-anchor', 'middle')
				.text((d) => d)
				.attr('fill', 'white')
				.style('font-size', '24px');
		}
	});
</script>

<div class="chart-container">
	<h4>Day One -- Max Effort Sets</h4>
	<svg bind:this={svgRef}></svg>
	{#if data.length === 0}
		<p class="instructions">
			Do a max set of pull-ups, enter your reps, and click "Complete Set".
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

	.bar {
		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
	}
</style>
