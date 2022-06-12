<script lang="ts">
	import { format } from 'd3-format';
	import { scaleBand } from 'd3-scale';
    import { getContext } from 'svelte';
	import { LayerCake, Svg, Canvas } from 'layercake';
	import AxisX from '$lib/layercake/AxisX.svelte';
	import AxisY from '$lib/layercake/AxisY.svelte';
	import Spectrogram from '$lib/layercake/Waterfall.svelte';
	import Line from '$lib/layercake/Line.svelte';    
	import { xlink_attr } from 'svelte/internal';
import Waterfall from '$lib/layercake/Waterfall.svelte';
    // import QuadTree from './QuadTree.html.svelte';

	export let data: Array<{ x: number; y: number }>;
	export let fc2;
	export let span2;
	// export let Ft = 98700000;
	export let Ft;
	export let visible = false;
	
    let brush;
    let range;
	// let innerWidth = 0
    // let innerHeight = 0
	let w;
	let h;
	let DynamicTicks = 8;
	

	let m = { x: 0, left: 0, right: 0 };

	function SelectFt(event) {
        // console.log(event)
        const { left, right } = brush.getBoundingClientRect();
		visible = true;
		m.x = event.clientX;
		m.left = left;
		m.right = right;
		// Ft = Math.round((m.x - left)/(right - left + 35) * (span2 * 2) + fc2 - span2);
		Ft = Math.round((m.x - left - 42)/(right - left - 42) * span2 + fc2 - span2/2);
		// return Ft;
		console.log( Ft )
	}

	$: {
		if (w<=300)	{	
		DynamicTicks = 2;
	}	else if (w<=600) {
		DynamicTicks = 4;
	}	else if (w>600) {
		DynamicTicks = 8;
	}
	console.log("Ticks:"+DynamicTicks)
}


</script>


<!-- <svelte:window bind:innerWidth bind:innerHeight />
{innerWidth},{innerHeight} -->

<div class="w-full h-full flex flex-col" bind:this={brush} on:click={SelectFt} bind:clientWidth={w} bind:clientHeight={h}>
	<!-- size: {w}px x {h}px -->
	<!-- <div class="basis-3/4 max-h-96"> -->
	<!-- xScale={fScale} -->
	<!-- xScale={scaleBand().paddingInner([0.1]).round(true)} -->
			<!-- xDomain={[data[0].x, data[data.length-1].x]} -->
			<!-- xScale={scaleBand([5]).paddingInner([0.5]).round(true)} -->		

	<LayerCake        
		{data}		
		x="x"
		y="y"
		z="y"		
		yDomain={[-8, 5]}
		padding={{ left: 42, right: 10, bottom: 20 }}    
	>
	
    <Svg >
        <AxisX formatTick={(d) => `${format('~s')(d)}Hz`} ticks={DynamicTicks}/>
        <AxisY formatTick={(d) => `${d} dB`} />
        <Line/>
        <!-- <Area /> -->
    </Svg>

	{#if visible === true}
		<div
		style="left:{(m.x - m.left)}px;"
		class="line"></div>
		<div
		class="tooltip"
		style="
			width:50 px;
			top: 500 px;
			left:{(m.x - m.left)}px;"
		>
		<div class="title">Tune to {Math.round(Ft/10000)/100}Mhz</div>
		</div>		
	{/if}
	</LayerCake>

	<LayerCake
		{data}
		x="x"
		y="y"
		z="y"
		yDomain={[20, 0]}
		zRange={[0, 1]}
		padding={{ left: 42, right: 10, bottom: 20 }}
	>
		<Svg>
			<AxisY gridlines={false} tickMarks={true} formatTick={(d) => `${format('~s')(d)}s`} />
		</Svg>

		<Canvas>
			<!-- <Spectrogram /> -->
			<Waterfall />
		</Canvas>

	</LayerCake>

	<!-- <div class="w-full h-full">
		
	</div> -->
</div>

<style>
	.tooltip {
	  position: absolute;
	  font-size: 13px;
	  pointer-events: none;
	  border: 1px solid #ccc;
	  background: rgba(255, 255, 255, 0.85);
	  transform: translate(-50%, -100%);
	  padding: 5px;
	  z-index: 15;
	  pointer-events: none;
	}
	.line {
	  position: absolute;
	  top: 0;
	  bottom: 0;
	  width: 1px;
	  border-left: 2px dotted rgb(0, 0, 0);
	  pointer-events: none;
	}
	.tooltip,
	.line {
	  transition: left 250ms ease-out, top 250ms ease-out;
	}
	.title {
	  font-weight: bold;
	}
  </style>
  