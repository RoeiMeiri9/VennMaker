<script lang="ts">
  import ClipPath from "./ClipPath.svelte";
  import Mask from "./Mask.svelte";
  import type { RegionConfig } from "../types";
  import VennLayer from "./VennLayer.svelte";

  let {
    config,
    width,
    height,
    maskNumber,
  }: {
    config: RegionConfig;
    width: number;
    height: number;
    maskNumber: number;
  } = $props();

  let { maskCircles, clipCircles, targetCircle } = $derived(config);

  let uid = $derived(Math.random().toString(36).substring(2, 9));
  let maskId = $derived(`m-${maskNumber}-${uid}`);
  let clipId = $derived(`c-${maskNumber}-${uid}`);
</script>

<defs>
  {#if maskCircles.length > 0}
    <Mask {maskId} {maskCircles} {width} {height} />
  {/if}

  {#if clipCircles.length > 0}
    <ClipPath {clipId} {clipCircles} />
  {/if}
</defs>

<VennLayer {maskId} {clipId}>
  {#snippet children()}
    <circle
      cx={targetCircle.cx}
      cy={targetCircle.cy}
      r={targetCircle.r}
      fill="#34c759"
    />
  {/snippet}
</VennLayer>

{#each maskCircles as circle}
  <text
    font-weight="bold"
    font-family="system-ui"
    text-anchor="middle"
    font-size="22"
    x={circle.circle.cx}
    y={circle.circle.cy}
    fill="#000">{circle.id}</text
  >
{/each}
