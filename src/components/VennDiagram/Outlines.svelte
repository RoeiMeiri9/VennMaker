<script lang="ts">
  import { CONFIG } from "@src/config";
  import { state } from "@src/core/states.svelte";

  let circles = $derived(
    CONFIG[state.mode].cC
      ? [CONFIG[state.mode].cA, CONFIG[state.mode].cB, CONFIG[state.mode].cC!]
      : [CONFIG[state.mode].cA, CONFIG[state.mode].cB],
  );
</script>

<g class="outline">
  {#each circles as circle}
    <circle cx={circle.cx} cy={circle.cy} r={circle.r}> </circle>
  {/each}
</g>
