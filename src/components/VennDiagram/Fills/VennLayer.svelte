<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    maskId = "",
    clipId = "",
  }: { children: Snippet; maskId?: string; clipId?: string } = $props();
</script>

<g
  mask={maskId ? `url(#${maskId})` : undefined}
  clip-path={clipId ? `url(#${clipId})` : undefined}
>
  {@render children()}
</g>
