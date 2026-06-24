<script lang="ts">
  import { getActiveRegions } from "@src/core/svg-regions";
  import { state } from "@src/states.svelte";
  import { CONFIG } from "@src/config";

  import paper from "paper";
  import { onMount } from "svelte";
  import { Color } from "paper/dist/paper-core";
  import type { Region } from "./types";

  let width = $derived(CONFIG[state.mode].width);
  let height = $derived(CONFIG[state.mode].height);

  let activeRegions = $derived(getActiveRegions(state.expression, state.mode));
  let canvas: HTMLCanvasElement;

  onMount(() => {
    paper.setup(canvas);
    render(activeRegions);

    return () => {
      paper.project.clear();
    };
  });

  $effect(() => {
    if (!paper.project) return;
    render(activeRegions);
  });

  $effect(() => {
    paper.view.viewSize = new paper.Size(width, height);
    paper.view.update();
    render(activeRegions);
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
    placeLabels();
  }

  function placeLabels() {
    const circlesData = CONFIG[state.mode].circles;
    const PADDING = 30;
    const fixX = 6;
    const fixY = 8;

    circlesData.forEach((c, index) => {
      const r = c.r + PADDING;
      const candidates = [
        { x: c.cx - (r - fixX), y: c.cy + fixY, label: "Left" },
        { x: c.cx + (r - fixX), y: c.cy + fixY, label: "Right" },
        { x: c.cx, y: c.cy - r, label: "Top" },
        { x: c.cx, y: c.cy + r, label: "Bottom" },
      ];

      let chosenPos = candidates[0];

      for (const pos of candidates) {
        const isColliding = circlesData.some((other, i) => {
          if (i === index) return false;
          const dist = Math.sqrt(
            (pos.x - other.cx) ** 2 + (pos.y - other.cy) ** 2,
          );
          return dist < other.r + PADDING;
        });

        if (!isColliding) {
          chosenPos = pos;
          break;
        }
      }

      new paper.PointText({
        point: [chosenPos?.x, chosenPos?.y],
        content: String.fromCharCode(65 + index),
        fillColor: "#222",
        fontFamily: "Arial",
        fontWeight: "bold",
        fontSize: 22,
        justification: "center",
      });
    });
  }

  async function copyCanvasToClipboard() {
    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve),
      );
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob }),
        ]);
        alert("התמונה הועתקה ללוח!");
      }
    } catch (err) {
      console.error("נכשל בהעתקה:", err);
    }
  }
</script>

<div id="svg-container">
  <canvas {width} {height} bind:this={canvas}></canvas>
</div>
<button onclick={() => copyCanvasToClipboard()}> העתק SVG </button>
