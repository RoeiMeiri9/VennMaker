<script lang="ts">
  import { setMode, state as globalState } from "@src/states.svelte";
  import Toggle from "./Toggle.svelte";
  import Input from "./Input.svelte";
</script>

<div class="controls">
  <div class="row">
    <Toggle
      id="btn2"
      active={globalState.mode === 2}
      onClick={() => setMode(2)}
    >
      2 עיגולים
    </Toggle>

    <Toggle
      id="btn3"
      active={globalState.mode === 3}
      onClick={() => setMode(3)}
    >
      3 עיגולים
    </Toggle>
  </div>

  <div class="row">
    <Input />
  </div>
  <div id="error-msg" class="error"> </div>
</div>

<style>
  .controls {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
</style>
