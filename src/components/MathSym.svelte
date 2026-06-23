<script lang="ts">
  import katex from "katex";
  let { formula = "" } = $props();
  let element: HTMLSpanElement;

  $effect(() => {
    try {
      element.innerHTML = "";
      katex.render(formula.trim().replace(/\$/g, ""), element, {
        throwOnError: true,
        displayMode: false,
      });
    } catch (e) {
      console.error(`Error rendering formula: "${formula}"`, e);
    }
  });
</script>

<span class="math-sym" bind:this={element}></span>
