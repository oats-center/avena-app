<script lang="ts">
	import { onMount } from 'svelte';
	import { connect, JSONCodec } from 'nats.ws';
	import type { NatsConnection } from 'nats.ws';
	import Spectrogram from '$lib/Spectrogram.svelte';
	import { current_component } from 'svelte/internal';
	// import Footer from '$lib/footer.svelte';
	// import { scaleLinear } from 'd3-scale';

	let nc: NatsConnection;
	let fc_value = 90;
	let Gain_value = 10;
	let Current_fc = 98700000;
	let Current_span = 1750000;
	let Current_ft = 98700000;


	const jc = JSONCodec();

	// FIXME: This is how NOT to do it
	onMount(async () => {
		// to create a connection to a nats-server:
		// nc = await connect({ servers: 'ws://172.16.2.1:443' });
		nc = await connect({ servers: 'ws://172.16.2.4:443' });
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
			Current_fc = fc;
			Current_span = span;

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


	function UpdateFc() {

		var Fc = fc_value * 1000000;

		console.log("Updated")
		// console.log(Ft , Fc , Gain_value)
		// console.log(jc.encode({ "ft": Ft , "fc": Fc, "gain": Gain_value}))
		// nc.publish('sdr.freq', jc.encode({ freq: Fc }));
		nc.publish('sdr.control', jc.encode({ "ft": Fc , "fc": 98700000, "gain": Gain_value}));
		// nc.publish('sdr.control', jc.encode({ ft: Fc , fc: Fc, gain: Gain_value}));
	
	}

	function SelectGain(){

		console.log("Hi")
		var Fc = fc_value * 1000000;
		// nc.publish('sdr.control', jc.encode({ "ft": Fc , "fc": Fc, "gain": Gain_value}));
		nc.publish('sdr.control', jc.encode({ "ft": Fc , "fc": 98700000, "gain": Gain_value}));
		// nc.publish('sdr.control', jc.encode({ ft: Fc , fc: Fc, gain: Gain_value}));

	}

	let data: Array<{ x: number; y: number }> = [];

	// let fScale = scaleLinear();
</script>


<h2 class="font-large font-semibold leading-tight text-2xl ml-2 mt-0 mb-12">Spectrum Analyzer</h2>
 <div class="w-full h-full flex flex-row">
	     

		<div class="basis-3/4">
			<Spectrogram 
			{data}
			fc2 = {Current_fc} 
			span2 = {Current_span}
			Ft = {Current_ft}
			 />	
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
			<input bind:value={Gain_value} on:change={SelectGain} type="range" min="0" max="50" class="range" step="1" />
			<div class="flex justify-between text-xs px-2 ">
				<span>0<br>dB</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>50<br>dB</span>
			</div>
			<!-- <div class="form-control w-full max-w-xs ">
				<select bind:value={Gain_value} on:click={SelectGain} class="select select-bordered">
				<option disabled selected>Select</option>
				<option>5</option>
				<option>10</option>
				<option>15</option>
				<option>20</option>
				<option>25</option>
				<option>30</option>
				</select>
			</div> -->
		</div> 
	
</div> 