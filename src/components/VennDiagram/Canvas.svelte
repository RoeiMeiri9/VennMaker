<script lang="ts">
  import { getActiveRegions } from "@src/core/svg-regions";
  import RegionLayer from "./Fills/RegionLayer.svelte";
  import { state } from "@src/core/states.svelte";
  import Outlines from "./Outlines.svelte";
  import Labels from "./Labels.svelte";
  import { CONFIG } from "@src/config";

  let width = $derived(CONFIG[state.mode].width);
  let height = $derived(CONFIG[state.mode].height);

  let activeRegions = $derived(getActiveRegions(state.expression, state.mode));
</script>

<!-- המחשה זמנית של הSVG שאני מחליף בה לאט לאט דברים -->
<svg
  {width}
  {height}
  viewBox="0 0 {width} {height}"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <style>
      .outline {
        fill: none;
        stroke: #222;
        stroke-width: 2.5;
      }
    </style>
  </defs>

  <g fill="#34c759" fill-opacity="1" opacity="0.55">
    {#each activeRegions as region (region.maskNumber + state.expression)}
      {@const config = region.config}
      {@const maskNumber = region.maskNumber}
      <div style="position: absolute; top: 0;">
        DEBUG: Rendering Mask {region.maskNumber} for Expression {state.expression}
      </div>

      <RegionLayer {config} {width} {height} {maskNumber} />
    {/each}
  </g>
  <Outlines />
  <Labels />
</svg>
