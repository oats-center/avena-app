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

<div class="spectogram">
<h1>Spectogram</h1>
</div>

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