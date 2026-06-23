<script lang="ts">
  import { CONFIG } from "@src/config";
  import { state } from "@src/core/states.svelte";
  const cfg = $derived(CONFIG[state.mode]);

  const fontSize: number = 22;
  const paddingLR: number = 110;
  const labels = $derived(
    state.mode === 3
      ? [
          { text: "A", x: cfg.cA.cx - paddingLR, y: cfg.cA.cy },
          { text: "B", x: cfg.cB.cx + paddingLR, y: cfg.cB.cy },
          { text: "C", x: cfg.cC?.cx, y: (cfg.cC?.cy || 0) + 120 },
        ]
      : [
          { text: "A", x: cfg.cA.cx - paddingLR, y: cfg.cA.cy },
          { text: "B", x: cfg.cB.cx + paddingLR, y: cfg.cB.cy },
        ],
  );
</script>

{#each labels as label}
  <text
    x={label.x}
    y={label.y}
    font-size={fontSize}
    font-weight="bold"
    font-family="system-ui"
    text-anchor="middle"
  >
    {label.text}
  </text>
{/each}

<style>
</style>
