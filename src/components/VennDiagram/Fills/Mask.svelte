<script lang="ts">
  import type { MaskCircles } from "../types";

  let {
    maskId = "",
    width = 400,
    height = 360,
    maskCircles,
  }: {
    maskId: string;
    width: number;
    height: number;
    maskCircles: MaskCircles[];
  } = $props();
</script>

<mask id={maskId}>
  <rect {width} {height} fill="#fff"> </rect>

  {#each maskCircles as circle}
    <circle
      cx={circle.circle.cx}
      cy={circle.circle.cy}
      r={circle.circle.r}
      fill="#000"
    />
  {/each}
</mask>
