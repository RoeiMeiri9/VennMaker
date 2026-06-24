<script lang="ts">
  import { Snippet } from "svelte";

  let {
    id,
    onClick,
    active,
    children,
  }: { id: string; onClick: Function; active: boolean; children: Snippet } =
    $props();
</script>

<button {id} class="toggle-btn" class:active onclick={onClick()}>
  {@render children()}
</button>

<style>
  .toggle-btn {
    background-color: var(--bg-muted);
    color: var(--text-main);
  }

  .toggle-btn:hover {
    background-color: var(--bg-muted-hover);
  }

  .toggle-btn.active {
    background-color: var(--color-success);
    color: var(--color-white);
  }

  .toggle-btn.active:hover {
    background-color: var(--color-success-hover);
  }
</style>
