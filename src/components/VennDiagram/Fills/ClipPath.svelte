<script lang="ts">
  import type { Circle } from "@src/config";

  let { clipId, clipCircles }: { clipId: string; clipCircles: Circle[] } =
    $props();
</script>

<clipPath id={clipId}>
  {#each clipCircles as c}
    <circle cx={c.cx} cy={c.cy} r={c.r} />
  {/each}
</clipPath>
