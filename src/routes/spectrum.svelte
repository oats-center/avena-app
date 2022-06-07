<script lang="ts">
	import { onMount } from 'svelte';
	import { connect, JSONCodec } from 'nats.ws';
	import type { NatsConnection } from 'nats.ws';
	// import { scaleLinear } from 'd3-scale';
	import { format } from 'd3-format';

	import { LayerCake, Svg, Canvas } from 'layercake';
	import AxisX from '$lib/layercake/AxisX.svelte';
	import AxisY from '$lib/layercake/AxisY.svelte';
	// import Area from '$lib/layercake/Area.svelte';
	import Spectrogram from '$lib/layercake/Spectrogram.svelte';
	import Line from '$lib/layercake/Line.svelte';

	let nc: NatsConnection;
	let fc_value = 90;
	const jc = JSONCodec();

	// FIXME: This is how NOT to do it
	onMount(async () => {
		// to create a connection to a nats-server:
		nc = await connect({ servers: 'ws://172.16.2.1:443' });
		// const nc = await connect({ servers: 'demo.nats.io:4223' });

		// create a codec
		// const jc = JSONCodec();

		// create a simple subscriber and iterate over messages
		// matching the subscription
		const sub = nc.subscribe('sdr.fft');
		for await (const m of sub) {
			const {
				FFT: fft,
				Span: span,
				Fc: fc,
				FFT_size: fft_size
			} = jc.decode(m.data) as {
				FFT: number[];
				Fc: number;
				Span: number;
				FFT_size: number;
			};

			data = fft.map((y, i) => ({
				x: fc - span / 2.0 + (i * span) / fft_size,
				y: Math.log(y / 10000)
			}));

			// fScale = scaleLinear().domain([fc - span / 2, fc + span / 2]);
		}
	});

	
	// $: {
	// 	if (nc) {
	// 		nc.publish('sdr.freq', JSON.stringify({ freq: fc_value * 1000000 }));
	// 		console.log("Update");
	// 	}
	// }

	function UpdateFc() {

		var Fc = fc_value * 1000000;

		console.log(Fc)
		console.log("Updated")

		nc.publish('sdr.freq', jc.encode({ freq: Fc }));
	}

	
	

	let data: Array<{ x: number; y: number }> = [];

	// let fScale = scaleLinear();
</script>


<div class="w-full h-full flex flex-col">
	<!-- <div class="basis-3/4 max-h-96"> -->
		<!-- xScale={fScale} -->
		<LayerCake
			{data}
			x="x"
			y="y"
			z="y"
			yDomain={[-8, 5]}
			padding={{ left: 35, right: 10, bottom: 20 }}
		>
			<Svg>
				<AxisX formatTick={(d) => `${format('~s')(d)}Hz`} />
				<AxisY formatTick={(d) => `${d} dB`} />
				<Line />
				<!-- <Area /> -->
			</Svg>
		</LayerCake>

		<!-- xScale={fScale} -->
		<LayerCake
			{data}
			x="x"
			y="y"
			z="y"
			yDomain={[20, 0]}
			zRange={[0, 1]}
			padding={{ left: 35, right: 10, bottom: 20 }}
		>
			<Svg>
				<AxisY gridlines={false} tickMarks={true} formatTick={(d) => `${format('~s')(d)} s`} />
			</Svg>

			<Canvas>
				<Spectrogram />
			</Canvas>
		</LayerCake>

		<h1>
			{fc_value}
		</h1>
		<input bind:value={fc_value} on:change={() => UpdateFc()} type="range" min="90" max="100" class="range" step="1" />
		<div class="flex justify-between text-xs px-2">
			<span>|</span>
			<span>|</span>
			<span>|</span>
			<span>|</span>
			<span>|</span>
		</div>

	<!-- <div class="w-full h-full">
		
	</div> -->
</div>
