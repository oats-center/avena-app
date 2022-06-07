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
	let Gain_value = 10;
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
			const { fft, span, fc, fft_size } = jc.decode(m.data) as {
				fft: string;
				fc: number;
				span: number;
				fft_size: number;
			};

			// let tmp = [];

			let array = Uint8Array.from(window.atob(fft), (c) => c.charCodeAt(0));
			let dv = new DataView(array.buffer);

			data = [];
			for (let i = 0; i < array.length; i++) {
				data = [
					...data,
					{
						x: fc - span / 2.0 + (i * span) / fft_size,
						y: Math.log(dv.getUint16(i, true) / 10000)
					}
				];
				i++;
			}

			// data = tmp;
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

	function SelectGain(){


		console.log("Hi")

	}

	
	

	let data: Array<{ x: number; y: number }> = [];

	// let fScale = scaleLinear();
</script>
<div class="w-full h-full flex flex-col">
	<h1 class="font-semibold">Spectrum Analyzer</h1>
	<div class="w-full h-full flex flex-row mt-8">
		<div class="basis-3/4 w-full h-full flex flex-col">
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

				

			<!-- <div class="w-full h-full">
				
			</div> -->
		</div>
		<div class="basis-1/4 container ml-4 mr-4 mt-4 border">
			<h1 class="mt-4">
				Center Frequency: {fc_value} Mhz
			</h1>
			<input bind:value={fc_value} on:change={() => UpdateFc()} type="range" min="90" max="100" class="range" step="1" />
			<div class="flex justify-between text-xs px-2 ">
				<span>90<br>Mhz</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>100<br>Mhz</span>
			</div>
			<h1 class="mt-4">
				Gain: {Gain_value} dB
			</h1>
			<div class="form-control w-full max-w-xs ">
				<!-- <label class="label">
				<span class="label-text">Gain</span>
				</label> -->
				<select bind:value={Gain_value} on:click={SelectGain} class="select select-bordered">
				<option disabled selected>Pick one</option>
				<option>5</option>
				<option>10</option>
				<option>15</option>
				<option>20</option>
				<option>25</option>
				<option>30</option>
				</select>
			</div>
		</div>
	</div>
</div>