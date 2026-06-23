<script lang="ts">
  import katex from "katex";
  export let formula = "";
  let element: HTMLSpanElement;

  $: if (element) katex.render(formula, element);
</script>

<span class="math-sym" bind:this={element}></span>
