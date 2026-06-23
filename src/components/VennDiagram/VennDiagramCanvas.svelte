<script lang="ts">
  import { getActiveRegions } from "@src/core/svg-regions";
  import { state } from "@src/core/states.svelte";
  import { CONFIG } from "@src/config";

  import { onMount } from "svelte";
  import paper from "paper";
  import { Color } from "paper/dist/paper-core";
  import type { Region } from "./types";

  let width = $derived(CONFIG[state.mode].width);
  let height = $derived(CONFIG[state.mode].height);

  let activeRegions = $derived(getActiveRegions(state.expression, state.mode));
  $effect(() => {
    render(activeRegions);
  });
  let canvas: HTMLCanvasElement;

  onMount(() => {
    paper.setup(canvas);
    render(activeRegions);

    return () => {
      paper.project.clear();
    };
  });
  let circles: paper.Path.Circle[] = [];

  function getRegion(signature: string): paper.PathItem | null {
    let region: paper.PathItem | null = null;

    // Build intersection of "1" circles
    for (let i = 0; i < signature.length; i++) {
      if (signature[i] === "1") {
        const circle = circles[i];
        if (!circle) continue;

        if (!region) {
          region = circle.clone();
        } else {
          region = region.intersect(circle);
        }
      }
    }

    if (!region) return null;

    // Subtract "0" circles
    for (let i = 0; i < signature.length; i++) {
      if (signature[i] === "0") {
        const circle = circles[i];
        if (!circle) continue;

        region = region.subtract(circle);
      }
    }

    region.fillColor = new Color("#34c759");
    region.opacity = 0.55;

    return region;
  }

  function render(activeRegions: Region[]) {
    circles = [];
    paper.project.clear();
    for (let i = CONFIG[state.mode].circles.length - 1; i >= 0; i--) {
      const c = CONFIG[state.mode].circles[i];
      if (!c) continue;
      const circle = new paper.Path.Circle({
        center: new paper.Point(c.cx, c.cy),
        radius: c.r,
        strokeColor: "#222",
        strokeWidth: 2.5,
      });
      circles.push(circle);
    }
    for (const ar of activeRegions) {
      if (ar.visible) {
        getRegion(ar.signature);
      }
    }
  }
</script>

<canvas {width} {height} bind:this={canvas}></canvas>
