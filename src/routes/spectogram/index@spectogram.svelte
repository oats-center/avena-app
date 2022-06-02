<script lang="ts">
	import { LayerCake, Svg } from 'layercake';
	import { Canvas } from 'svelte-canvas';
	// import { Canvas } from 'layercake';

	import Line from '../_components/Line.svelte';
	import Area from '../_components/Area.svelte';
	import AxisX from '../_components/AxisX.svelte';
	import AxisY from '../_components/AxisY.svelte';

	import { onMount } from 'svelte';

	import { extent } from 'd3-array';
	import { scaleLinear } from 'd3-scale';
	import { each } from 'svelte/internal';

	import Point from '../_components/Point.svelte';
	import Axis from '../_components/Axis.svelte';
	import { component_subscribe, each, loop_guard } from 'svelte/internal';
	import { interpolateInferno } from 'd3-scale-chromatic';
	import Index from '../index.svelte';
	// const colors = interpolateInferno(0.1)[9];
	const colors = [
		'#000004',
		'#010005',
		'#180c3c',
		'#3d0965',
		'#6f196e',
		'#85216b',
		'#c63d4d',
		'#ca404a',
		'#d54a41',
		'#d74b3f',
		'#fb9906',
		'#fcae12',
		'#f5db4c',
		'#f1ed71',
		'#fcffa4'
	];
	const color_limit = 15;
	let colorKey;
	let CurrentColor;
	var color;
	function chooseColor(key) {
		// colorKey = key;
		color = colors[key];
		return colors[key];
	}
	// $: color = colors[colorKey];
	const margin = { top: 10, right: 10, bottom: 20, left: 35 };

	let points = [];
	let width, height;
	// import fft_data from './mock_fft.json';
	// const data = JSON.parse(fft_data);

	// points = JSON.parse(JSON.stringify(fft_data));
	points = fft_data.map((d, id) => ({ fft_block: d.FFT, id })).filter((d) => d.fft_block);

	// let data = fetch('./mock_fft.json');
	// let json = data.json();

	// import fft_data from './mock_fft_1.json';
	// import fft_data from './sample1.json';
	import fft_data from './sample1.json';

	const xKey = 'frequency';
	const yKey = 'magnitude';
	const high_limit = -50;
	const low_limit = -85;
	const level = (low_limit - high_limit) / color_limit;

	import Index from '../index.svelte';
	// import Brush from '../_components/Brush.html.svelte';

	$: x = scaleLinear()
		// .domain(extent(points, (d) => d.freq))
		.domain([0, 32767])
		.range([margin.left, width - margin.right])
		.nice();

	$: y = scaleLinear()
		// .domain(extent(points, (d) => d.time))
		.domain([0, 200])
		.range([height - margin.bottom, margin.top])
		.nice();
</script>

<!-- <div class="spectogram">
	<h1>Spectogram</h1>
</div> -->

<main>
	<!-- grid grid-cols-2 gap-2 -->
	<div class="flex flex-row mb-16 ml-8">
		<div>
			<div class="Plot" bind:clientWidth={width} bind:clientHeight={height}>
				<Canvas {width} {height}>
					<Axis type="x" scale={x} tickNumber={10} {margin} />
					<Axis type="y" scale={y} tickNumber={10} {margin} />
					<!-- <Point x={x(0)} y={y(0)} fill="#ffffff" r="2" /> -->

					{#each fft_data as { FFT }, time_index}
						{#each FFT as { value }, freq_index}
							<!-- <p>{FFT[freq_index]}, {freq_index}</p> -->
							{#if FFT[freq_index] > high_limit}
								{(color = colors[0])}
							{:else if FFT[freq_index] < high_limit && FFT[freq_index] > high_limit - level}
								{(color = colors[1])}
							{:else if FFT[freq_index] < high_limit - level && FFT[freq_index] > high_limit - 2 * level}
								{(color = colors[2])}
							{:else if FFT[freq_index] < high_limit - 2 * level && FFT[freq_index] > high_limit - 3 * level}
								{(color = colors[3])}
							{:else if FFT[freq_index] < high_limit - 3 * level && FFT[freq_index] > high_limit - 4 * level}
								{(color = colors[4])}
							{:else if FFT[freq_index] < high_limit - 4 * level && FFT[freq_index] > high_limit - 5 * level}
								{(color = colors[5])}
							{:else if FFT[freq_index] < high_limit - 5 * level && FFT[freq_index] > high_limit - 6 * level}
								{(color = colors[6])}
							{:else if FFT[freq_index] < high_limit - 6 * level && FFT[freq_index] > high_limit - 7 * level}
								{(color = colors[7])}
							{:else if FFT[freq_index] < high_limit - 7 * level && FFT[freq_index] > high_limit - 8 * level}
								{(color = colors[8])}
							{:else if FFT[freq_index] < high_limit - 8 * level && FFT[freq_index] > high_limit - 9 * level}
								{(color = colors[9])}
							{:else if FFT[freq_index] < high_limit - 9 * level && FFT[freq_index] > high_limit - 10 * level}
								{(color = colors[10])}
							{:else if FFT[freq_index] < high_limit - 10 * level && FFT[freq_index] > high_limit - 11 * level}
								{(color = colors[11])}
							{:else if FFT[freq_index] < high_limit - 11 * level && FFT[freq_index] > high_limit - 12 * level}
								{(color = colors[12])}
							{:else if FFT[freq_index] < high_limit - 12 * level && FFT[freq_index] > high_limit - 13 * level}
								{(color = colors[13])}
							{:else}
								{(color = colors[14])}
							{/if}
							<!-- <Point x='100' y='100' fill='#ffffff' r="20" /> -->
							<Point x={x(freq_index)} y={y(time_index)} fill={color} r="2.5" />
						{/each}
					{/each}
				</Canvas>
			</div>
		</div>
		<div class="container mx-auto">
			<div>
				<label class="label">
					<span class="label-text">FFT Size</span>
				</label>
				<div class="flex flex-row items-center">
					<div class="form-control basis-1/2">
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full max-w-xs"
						/>
					</div>
					<div class="dropdown basis-1/2">
						<label tabindex="0" class="btn m-1">Unit</label>
						<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
							<li><a>Item 1</a></li>
							<li><a>Item 2</a></li>
						</ul>
					</div>
				</div>
			</div>

			<div>
				<label class="label">
					<span class="label-text">Center Frequency</span>
				</label>
				<div class="flex flex-row items-center">
					<div class="form-control basis-1/2">
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full max-w-xs"
						/>
					</div>
					<div class="dropdown basis-1/2">
						<label tabindex="0" class="btn m-1">Unit</label>
						<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
							<li><a>Item 1</a></li>
							<li><a>Item 2</a></li>
						</ul>
					</div>
				</div>
			</div>

			<div>
				<label class="label">
					<span class="label-text">Gain</span>
				</label>
				<div class="flex flex-row items-center">
					<div class="form-control basis-1/2">
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full max-w-xs"
						/>
					</div>
					<div class="dropdown basis-1/2">
						<label tabindex="0" class="btn m-1">Unit</label>
						<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
							<li><a>Item 1</a></li>
							<li><a>Item 2</a></li>
						</ul>
					</div>
				</div>
			</div>

			<div>
				<label class="label max-w-fit">
					<span class="label-text">Sample Rate</span>
				</label>
				<div class="flex flex-row items-center">
					<input type="range" min="0" max="100" value="40" class="range range-primary" />
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.Plot {
		width: 100%;
		height: 100%;
		background-color: rgb(62, 67, 163);
	}
</style>
