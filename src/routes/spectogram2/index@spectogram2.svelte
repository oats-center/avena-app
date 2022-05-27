<script>
  import { LayerCake, Svg } from 'layercake';

  import Line from '../_components/Line.svelte';
  import Area from '../_components/Area.svelte';
  import AxisX from '../_components/AxisX.svelte';
  import AxisY from '../_components/AxisY.svelte';
  const points = [
  {x: 0, y: 0},
  {x: 5, y: 10},
  {x: 10, y: 20},
  {x: 15, y: 30},
  {x: 20, y: 40},
  {x:25, y:50}
];
</script>

<!-- 
<div class="navbar bg-base-100">
  <div class="flex-none">
    <button class="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </button>
  </div>
  <div class="flex-1">
    <a href="/" class="tab tab-bordered">Home</a> 
      <a href="/spectogram" class="tab tab-bordered tab-active">Spectogram</a> 
      <a href="/spectogram2" class="tab tab-bordered tab-active">Spectogram</a> 
  </div>
  <div class="flex-none">
    <button class="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
    </button>
  </div>
  
</div> -->


<!-- <div class="tiledBackground">
</div> -->


<!-- <div class="spectogram">
  <h1>Spectogram</h1>
  </div> -->

<div class="chart-container">
  <LayerCake
    padding={{ right: 10, bottom: 20, left: 25 }}
    x='x'
    y='y'
    data={points}
    yDomain={[0, null]}
  >
    <Svg>
      <AxisX/>
      <AxisY
        ticks={4}
      />
      <Line/>
      <Area/>
    </Svg>
  </LayerCake>
</div>

<style>
  .index{
      text-align: center;
      display: bottom;
      margin: 20px auto;
  }

  /*
  The wrapper div needs to have an explicit width and height in CSS.
  It can also be a flexbox child or CSS grid element.
  The point being it needs dimensions since the <LayerCake> element will
  expand to fill it.
*/
.chart-container {
  align-items: center;
  position:fixed;
  width: 70%;
  height: 70%;
  /* overflow-y: scroll; */
  -webkit-overflow-scrolling: touch;
  flex: auto;
}
</style>