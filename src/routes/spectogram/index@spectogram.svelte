<script lang="ts">
	import { LayerCake, Svg } from 'layercake';
	// import { Canvas } from 'layercake';

	import Line from '../_components/Line.svelte';
	import Area from '../_components/Area.svelte';
	import AxisX from '../_components/AxisX.svelte';
	import AxisY from '../_components/AxisY.svelte';

	import { onMount } from 'svelte';
	import { Canvas } from 'svelte-canvas';
	import { extent } from 'd3-array';
	import { scaleLinear } from 'd3-scale';

	import Point from '../_components/Point.svelte';
	import Axis from '../_components/Axis.svelte';
	import { each, loop_guard } from 'svelte/internal';
	import { schemeRdYlBu } from 'd3-scale-chromatic';
	const colors = schemeRdYlBu[10];

	let colorKey;
	function chooseColor(key) {
		colorKey = key;
	}
	$: color = colors[colorKey];
	const margin = { top: 10, right: 10, bottom: 25, left: 25 };

	let points = [];
	let width, height;
	import fft_data from './mock_fft.json';
	// const data = JSON.parse(fft_data);
	import Index from '../index.svelte';
	// points = JSON.parse(JSON.stringify(fft_data));
	points = fft_data.map((d, id) => ({ fft_block: d.FFT, id })).filter((d) => d.fft_block);

	// onMount(() =>
	// fetch('https://raw.githubusercontent.com/vega/vega/master/docs/data/cars.json')
	// fetch('./mock_fft.json')
	// .map((d, id) => ({ freq: d.frequency, mag: d.magnitude, time: d.time, id }))
	// .filter((d) => d.freq && d.mag && d.time);
	// 		})
	// );

	$: x = scaleLinear()
		// .domain(extent(points, (d) => d.freq))
		.domain([0, 8])
		.range([margin.left, width - margin.right])
		.nice();

	$: y = scaleLinear()
		// .domain(extent(points, (d) => d.time))
		.domain([0, 10])
		.range([height - margin.bottom, margin.top])
		.nice();

	// $: z = scaleLinear()
	// 	.domain(extent(points, (d) => d.mag))
	// 	.range([height - margin.bottom, margin.top])
	// 	.nice();
</script>

<div class="spectogram">
	<h1>Spectogram</h1>
</div>

<!-- {#each fft_data as { FFT }, time_index}
	{#each FFT as value, freq_index}
		<p>{FFT[freq_index]}, {freq_index}</p>
	{/each}
{/each} -->

<!-- <div class="Plot"> -->
<div class="Plot" bind:clientWidth={width} bind:clientHeight={height}>
	<!-- <LayerCake padding={margin} x={(d) => d.freq} y={(d) => d.time} data={points}> -->
	<Canvas {width} {height}>
		<!-- <Canvas> -->
		<!-- <Svg> -->
		<Axis type="x" scale={x} tickNumber={20} {margin} />
		<Axis type="y" scale={y} tickNumber={20} {margin} />
		<!-- <AxisX ticks={100} />
			<AxisY ticks={100} /> -->
		{#each fft_data as { FFT }, time_index}
			{#each FFT as { value }, freq_index}
				<p>{FFT[freq_index]}, {freq_index}</p>
				{#if FFT[freq_index] > -14}
					{chooseColor(0)}
				{:else if FFT[freq_index] < -14 && FFT[freq_index] > -15}
					{chooseColor(1)}
				{:else if FFT[freq_index] < -15 && FFT[freq_index] > -16}
					{chooseColor(2)}
				{:else if FFT[freq_index] < -16 && FFT[freq_index] > -17}
					{chooseColor(3)}
				{:else if FFT[freq_index] < -17 && FFT[freq_index] > -18}
					{chooseColor(4)}
				{:else if FFT[freq_index] < -18 && FFT[freq_index] > -19}
					{chooseColor(5)}
				{:else if FFT[freq_index] < -19 && FFT[freq_index] > -20}
					{chooseColor(6)}
				{:else if FFT[freq_index] < -20 && FFT[freq_index] > -21}
					{chooseColor(7)}
				{:else if FFT[freq_index] < -21 && FFT[freq_index] > -22}
					{chooseColor(8)}
				{:else}
					{chooseColor(9)}
				{/if}
				<Point x={x(freq_index)} y={y(time_index)} fill={color} r="2" />
				<!-- <Point x={x(freq)} y={3} fill={color} r="2" /> -->
			{/each}
		{/each}
	</Canvas>
	<!-- </Svg> -->
	<!-- </LayerCake> -->
</div>

<style>
	.Plot {
		width: 100%;
		height: 100%;
		background-color: rgba(8, 22, 103, 0.636);
	}
</style>
