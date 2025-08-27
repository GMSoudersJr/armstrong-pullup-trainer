<script lang="ts">
	import * as d3 from 'd3';

	interface Props {
		previousData?: number[];
		currentData?: number[];
	}

	let { previousData = [], currentData = [] }: Props = $props();

	let svgRef: SVGElement;

	$effect(() => {
		if (svgRef) {
			const allData = [...previousData, ...currentData];
			const width = 600;
			const height = width / 1.618;

			const svg = d3.select(svgRef);
			svg.selectAll('*').remove(); // Clear previous render

			svg.attr('viewBox', `0 0 ${width} ${height}`);

			const margin = { top: 20, right: 20, bottom: 30, left: 40 };

			const x0 = d3
				.scaleBand()
				.range([margin.left, width - margin.right])
				.padding(0.25)
				.domain(['1', '2', '3', '4', '5']);

			const x1 = d3.scaleBand().padding(0.05);

			const y = d3
				.scaleLinear()
				.range([height - margin.bottom, margin.top])
				.domain([0, d3.max(allData) ?? 1]);

			svg
				.append('g')
				.attr('transform', `translate(0, ${height - margin.bottom})`)
				.call(d3.axisBottom(x0))
				.selectAll('text')
				.style('font-size', '16px')
				.attr('dy', '1em');

			const dataSets = [];
			if (previousData.length > 0)
				dataSets.push({ key: 'previous', data: previousData });
			if (currentData.length > 0)
				dataSets.push({ key: 'current', data: currentData });

			x1.domain(dataSets.map((d) => d.key)).range([0, x0.bandwidth()]);

			const color = d3
				.scaleOrdinal()
				.domain(['previous', 'current'])
				.range(['#663399', '#16a34a']);

			const series = svg
				.selectAll('.series')
				.data(dataSets)
				.enter()
				.append('g')
				.attr('class', 'series')
				.attr('fill', (d) => color(d.key) as string);

			series
				.selectAll('rect')
				.data((d) =>
					d.data.map((val, i) => ({ key: d.key, value: val, index: i }))
				)
				.enter()
				.append('rect')
				.attr(
					'x',
					(d) => (x0((d.index + 1).toString()) ?? 0) + (x1(d.key) ?? 0)
				)
				.attr('y', (d) => y(d.value))
				.attr('width', x1.bandwidth())
				.attr('height', (d) => height - margin.bottom - y(d.value))
				.attr('rx', 8)
				.attr('ry', 8);

			series
				.selectAll('text.label')
				.data((d) =>
					d.data.map((val, i) => ({ key: d.key, value: val, index: i }))
				)
				.enter()
				.append('text')
				.attr('class', 'label')
				.attr(
					'x',
					(d) =>
						(x0((d.index + 1).toString()) ?? 0) +
						(x1(d.key) ?? 0) +
						x1.bandwidth() / 2
				)
				.attr('y', (d) => y(d.value) + 20)
				.attr('text-anchor', 'middle')
				.text((d) => d.value)
				.attr('fill', 'white')
				.style('font-size', '18px');
		}
	});
</script>

<div class="chart-container">
	<h4>Day One -- Max Effort Sets</h4>
	<svg bind:this={svgRef}></svg>
	{#if currentData.length === 0 && previousData.length === 0}
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
</style>
