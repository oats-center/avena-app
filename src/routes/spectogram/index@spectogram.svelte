<script>
    import { LayerCake, Svg } from 'layercake';

    import Line from '../_components/Line.svelte';
    import Area from '../_components/Area.svelte';
    import AxisX from '../_components/AxisX.svelte';
    import AxisY from '../_components/AxisY.svelte';
    import Brush from './_components/Brush.html.svelte';
    const data = [
    {x: 0, y: 0},
    {x: 5, y: 10},
    {x: 10, y: 20},
    {x: 15, y: 30},
    {x: 20, y: 40},
    {x:25, y:50}
    ];

    const xKey = 'myX';
    const yKey = 'myY';

    data.forEach(d => {
    d[yKey] = +d[yKey];
    });

    let brushedData;
    $: {
      brushedData = data.slice((brushExtents[0] || 0) * data.length, (brushExtents[1] || 1) * data.length);
      if (brushedData.length < 2) {
        brushedData = data.slice(brushExtents[0] * data.length, brushExtents[0] * data.length + 2)
      }
    }


</script>


<!-- <div class="chart-container">
  <LayerCake
    padding={{ right: 10, bottom: 20, left: 25 }}
    x={xKey}
    y={yKey}
    yDomain={[0, null]}
    data={brushedData}
  >
    <Svg>
      <AxisX
        ticks={ticks => {
          const filtered = ticks.filter(t => t % 1 === 0);
          if (filtered.length > 7) {
            return filtered.filter((t, i) => i % 2 === 0);
          }
          return filtered;
        }}
      />
      <AxisY
        ticks={4}
      />
      <Line
        stroke='#00e047'
      />
      <Area
        fill='#00e04710'
      />
    </Svg>
  </LayerCake>
</div>

<div class="brush-container">
  <LayerCake
    padding={{ top: 5 }}
    x={xKey}
    y={yKey}
    yDomain={[0, null]}
    data={data}
  >
    <Svg>
      <Line
        stroke='#00e047'
      />
      <Area
        fill='#00e04710'
      />
    </Svg>
    <Html>
      <Brush bind:min={brushExtents[0]} bind:max={brushExtents[1]}/>
    </Html>
  </LayerCake>
</div> -->

<!-- <div class="chart-container">
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
</div> -->

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