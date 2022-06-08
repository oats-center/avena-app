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
    let brush;
    let range;


	let m = { x: 0, y: 0 };
    // export let x = 'x';
    // export let y = 'y';

    // const {x, y} = getContext('LayerCake');



    // $: xGetter = x === 'x' ? $xGet : $yGet;
	// $: yGetter = y === 'y' ? $yGet : $xGet;

	function SelectFc(event) {
        // console.log(event)
        const { left, right } = brush.getBoundingClientRect();
		console.log(m.x-left+35,right);        
		console.log(fc2,span2);
		console.log((m.x - left + 35)/(right - left - 35) * (span * 2) + fc - span)
		// ft = (m.x - left + 35)/(right - left - 35) * (span * 2) + fc - span

	}

	// {console.log(data[0].x,data[data.length-1].x)}

</script>

<div class="w-full h-full flex flex-col" bind:this={brush} on:mousemove={SelectFc}>
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
        <!-- <div
      class="tooltip"
      style="
        left:{ $width }px;"
       >
      </div> -->
        
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
