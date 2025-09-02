<script lang="ts">
	import * as d3 from 'd3';
	import type { DayThreeChartData } from '../types';

	interface Props {
		previousData?: DayThreeChartData;
		currentData?: DayThreeChartData;
	}

	let { previousData, currentData }: Props = $props();

	let svgRef: SVGElement;

	const colors = {
		current: '#16a34a',
		previous: '#663399'
	};

	$effect(() => {
		if (!svgRef) return;

		const svg = d3.select(svgRef);
		svg.selectAll('*').remove();

		if (currentData?.length === 0) return;

		const referenceData = previousData || currentData;
		$inspect(referenceData);
		$inspect(currentData);
		if (!referenceData) return;

		const width = 600;
		const height = width / 1.618;
		const margin = { top: 20, right: 20, bottom: 40, left: 40 };

		svg.attr('viewBox', `0 0 ${width} ${height}`);

		const groupNames: string[] = referenceData.map((d) => d.group);
		const setNames: string[] = referenceData[0].values.map((d) => d.name);
		const workoutKeys: ('previous' | 'current')[] = [];
		if (previousData) workoutKeys.push('previous');
		if (currentData) workoutKeys.push('current');

		const mergedData: {
			group: string;
			values: { name: string; previous: number; current: number }[];
		}[] = groupNames.map((groupName) => ({
			group: groupName,
			values: setNames.map((setName) => {
				const prevValue =
					previousData
						?.find((g) => g.group === groupName)
						?.values?.find((v) => v.name === setName)?.value ?? 0;
				const currValue =
					currentData
						?.find((g) => g.group === groupName)
						?.values?.find((v) => v.name === setName)?.value ?? 0;
				return {
					name: setName,
					previous: prevValue,
					current: currValue
				};
			})
		}));

		const x0 = d3
			.scaleBand()
			.domain(groupNames)
			.rangeRound([margin.left, width - margin.right])
			.paddingInner(0.2);

		const x1 = d3
			.scaleBand()
			.domain(setNames)
			.rangeRound([0, x0.bandwidth()])
			.padding(0.1);

		const x2 = d3
			.scaleBand()
			.domain(workoutKeys)
			.rangeRound([0, x1.bandwidth()])
			.padding(0.05);

		const y = d3.scaleLinear().rangeRound([height - margin.bottom, margin.top]);

		const allValues: number[] = [];
		if (previousData)
			previousData.forEach((g) =>
				g.values.forEach((v) => allValues.push(v.value))
			);
		if (currentData)
			currentData.forEach((g) =>
				g.values.forEach((v) => allValues.push(v.value))
			);
		y.domain([0, d3.max(allValues) || 10]).nice();

		const color = d3
			.scaleOrdinal<string>()
			.domain(workoutKeys)
			.range(workoutKeys.map((k) => colors[k]));

		svg
			.append('g')
			.attr('transform', `translate(0,${height - margin.bottom})`)
			.call(d3.axisBottom(x0));

		svg
			.append('g')
			.attr('transform', `translate(${margin.left},0)`)
			.call(d3.axisLeft(y));

		const groupG = svg
			.append('g')
			.selectAll('g')
			.data(mergedData)
			.join('g')
			.attr('transform', (d) => `translate(${x0(d.group) || 0},0)`);

		const setG = groupG
			.selectAll('g')
			.data((d) => d.values)
			.join('g')
			.attr('transform', (d) => `translate(${x1(d.name) || 0},0)`);

		setG
			.selectAll('rect')
			.data((d) => workoutKeys.map((key) => ({ key, value: d[key] })))
			.join('rect')
			.attr('x', (d) => x2(d.key) || 0)
			.attr('y', (d) => y(d.value))
			.attr('width', x2.bandwidth())
			.attr('height', (d) => y(0) - y(d.value))
			.attr('fill', (d) => color(d.key));

		setG
			.selectAll('text.set-label')
			.data((d) => [d])
			.join('text')
			.attr('class', 'set-label')
			.attr('x', x1.bandwidth() / 2)
			.attr('y', height - margin.bottom + 15)
			.attr('text-anchor', 'middle')
			.style('font-size', '10px')
			.text((d) => d.name);
	});
</script>

<div class="chart-container">
	<h4>Three Sets X Three Grips</h4>
	<svg bind:this={svgRef}></svg>
	{#if previousData && currentData}
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
		</div>
	{/if}
	{#if !currentData && !previousData}
		<p class="instructions">
			Complete your training sets to see your progress.
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
