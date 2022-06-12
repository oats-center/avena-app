<script lang="ts">
	import { onMount } from 'svelte';
	import { connect, JSONCodec } from 'nats.ws';
	import type { NatsConnection } from 'nats.ws';
	import Spectrogram from '$lib/Spectrogram.svelte';
	import { current_component } from 'svelte/internal';
	// import Footer from '$lib/footer.svelte';
	// import { scaleLinear } from 'd3-scale';

	let nc: NatsConnection;
	let Gain_value = 10;
	let Ft = 98700000;
	let Fc = 98700000;
	let Span;
	let fc_value = 98.7;
	let visible = false;



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
			// console.log("Receiving data")
			// let tmp = [];

			let array = Uint8Array.from(window.atob(fft), (c) => c.charCodeAt(0));
			let dv = new DataView(array.buffer);
			Fc = fc;
			Span = span;

			data = [];
			// for (let i = 0; i < array.length; i++) {
			for (let i = 0; i < Math.round(array.length/2); i++) {
				data = [
					...data,
					{
						x: fc - span / 2.0 + (i * span) / fft_size,
						y: Math.log(dv.getUint16(i, true) / 10000)
					}
				];
				i++;
			}
			// console.log("data")
			// data = tmp;
		}
	});

	$: fc_value = Math.round(Fc/10000)/100;


	function UpdateFc() {

		Fc = fc_value * 1000000;

		console.log("Updated")
		console.log(Fc , Fc , Gain_value)
		// console.log(jc.encode({ "ft": Ft , "fc": Fc, "gain": Gain_value}))
		// nc.publish('sdr.freq', jc.encode({ freq: Fc }));
		nc.publish('sdr.control', jc.encode({ "ft": Fc , "fc": Fc, "gain": Gain_value}));
		// nc.publish('sdr.control', jc.encode({ ft: Fc , fc: Fc, gain: Gain_value}));
	
	}

	function UpdateFt(Ft) {

		Fc = fc_value * 1000000;

		console.log("Updated")
		console.log(Ft , Fc , Gain_value)
		
		// nc.publish('sdr.control', jc.encode({ "ft": Fc , "fc": 98700000, "gain": Gain_value}));
		nc.publish('sdr.control', jc.encode({ "ft": Ft , "fc": Fc, "gain": Gain_value}));

	}

	$: {
		if (nc && visible === true) {
		UpdateFt(Ft);
	}
	}

	// $: Fc = fc_value * 1000000;

	function SelectGain(){

		Fc = fc_value * 1000000;
		console.log(Ft , Fc , Gain_value)		
		console.log("Updated")
		// nc.publish('sdr.control', jc.encode({ "ft": Fc , "fc": Fc, "gain": Gain_value}));
		nc.publish('sdr.control', jc.encode({ "ft": Ft , "fc": Fc, "gain": Gain_value}));
		// nc.publish('sdr.control', jc.encode({ ft: Fc , fc: Fc, gain: Gain_value}));

	}

	let data: Array<{ x: number; y: number }> = [];



</script>


<!-- <h2 class="font-large font-semibold leading-tight text-2xl ml-2 mt-0 mb-12">Spectrum Analyzer</h2> -->
 <div class="w-full h-full flex flex-row">
		<div class="basis-3/4 h-full">
			<Spectrogram 
			bind:Ft={Ft}
			bind:visible = {visible}
			{data}
			fc = {Fc} 
			span = {Span}
			/>	
		</div>
		<div class="basis-1/4 container ml-2 mr-2 mt-2 border">
			<div class="ml-2 mr-2"> 
			<h1 class="mt-2 mb-2 text-sm semi-bold">
				<!-- Center Frequency: {Math.round(Fc/10000)/100} Mhz -->
				Center Frequency: {fc_value} Mhz
			</h1>
			<input bind:value={fc_value} on:change={() => UpdateFc()} type="range" min="90" max="100" class="range" step="1"/>
			<div class="flex justify-between text-xs px-2">
				<span>90<br>Mhz</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>|</span>
				<span>100<br>Mhz</span>
			</div>
			<h1 class="mt-4 text-sm">
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
		</div>
		</div> 
	
</div> 