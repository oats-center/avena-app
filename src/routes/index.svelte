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
  import { each } from 'svelte/internal';

	import Point from '../_components/Point.svelte';
	import Axis from '../_components/Axis.svelte';
	import { component_subscribe, each, loop_guard } from 'svelte/internal';
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

	// let data = fetch('./mock_fft.json');
	// let json = data.json();

	import fft_data from './mock_fft_1.json';
  // import fft_data from './sample1.json';
  import fft_data2 from './sample1.json';

	const xKey = 'frequency';
	const yKey = 'magnitude';
  // var Data = {};
  let Data;

	import Index from '../index.svelte';
// import Brush from '../_components/Brush.html.svelte';

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

</script>

<!-- <div class="spectogram">
	<h1>Spectogram</h1>
</div> -->

<main>
  <div>
      {#each fft_data2 as fft2}
       <!-- {console.log(Object.values(fft2.FFT))} -->
       {Object.entries(fft2.FFT)}
       {Object.entries(fft2.FFT).forEach( (index) => { 
         console.log(index);
         })}
       <li>{Data}</li>
      <li> {[...Array(9).keys()]} </li>
        <li> {fft2.FFT}</li>
        <div class="chart-container">
          <LayerCake
            padding={{ right: 10, bottom: 20, left: 25 }}
            x={'FFT'}
            y={'FFT'}            
            data={fft2}
            extents={{ x: [...Array(9).keys()], y: fft2.FFT }}          >
            <Svg>
              <AxisX />
              <AxisY ticks={4} />
              <Line />
              <Area />
            </Svg>
          </LayerCake>
        </div>
      {/each}
  </div>

	<div class="grid grid-cols-2 gap-2 mb-16">
		<div>
			<!-- {#each fft_data as fft, time_index} -->
			<!-- <p>{FFT[1]}</p> -->

			<div class="chart-container">
				<LayerCake
					padding={{ right: 10, bottom: 20, left: 25 }}
					x={xKey}
					y={yKey}
					yDomain={[0, null]}
					data={fft_data}
				>
					<Svg>
						<AxisX />
						<AxisY ticks={4} />
						<Line />
						<Area />
					</Svg>
				</LayerCake>
			</div>
			<!-- {/each} -->
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
				<label class="label">
					<span class="label-text">Sample Rate</span>
				</label>
				<div class="flex flex-row items-center">
					<input type="range" min="0" max="100" value="40" class="range range-primary" />
				</div>
			</div>
		</div>
	</div>
</main>
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
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
		width: 100%;
		height: 100%;
	}
</style>
