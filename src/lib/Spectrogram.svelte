<script lang="ts">
	import { format } from 'd3-format';
    import { getContext } from 'svelte';
	import { LayerCake, Svg, Canvas } from 'layercake';
	import AxisX from '$lib/layercake/AxisX.svelte';
	import AxisY from '$lib/layercake/AxisY.svelte';
	import Spectrogram from '$lib/layercake/Waterfall.svelte';
	import Line from '$lib/layercake/Line.svelte';    
	import { xlink_attr } from 'svelte/internal';
    // import QuadTree from './QuadTree.html.svelte';

	export let data: Array<{ x: number; y: number }>;
	export let fc2;
	export let span2;
	export let Ft = 98700000;
	// export let Ft;	
    let brush;
    let range;


	let m = { x: 0, left: 0, right: 0 };

	function SelectFt(event) {
        // console.log(event)
        const { left, right } = brush.getBoundingClientRect();
		m.x = event.clientX;
		m.left = left;
		m.right = right;
		Ft = Math.round((m.x - left)/(right - left + 35) * (span2 * 2) + fc2 - span2);
		// return Ft;
		console.log( Ft )
	}

	// {console.log(data[0].x,data[data.length-1].x)}

</script>

<div class="w-full h-full flex flex-col" bind:this={brush} on:click={SelectFt}>
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
	
    <Svg >
        <AxisX formatTick={(d) => `${format('~s')(d)}Hz`} />
        <AxisY formatTick={(d) => `${d} dB`} />
        <Line/>
        <!-- <Area /> -->
    </Svg>
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
	  border-left: 1px dotted #666;
	  pointer-events: none;
	}
	.tooltip,
	.line {
	  transition: left 250ms ease-out, top 250ms ease-out;
	}
	.title {
	  font-weight: bold;
	}
	.key {
	  color: #999;
	}
  </style>
  