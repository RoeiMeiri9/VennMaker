<script lang="ts">
  import { setMode, state } from "@src/states.svelte";
  import { correctExpression } from "@src/utils/parseExpression";
  import Toggle from "./Toggle.svelte";
</script>

<div class="controls">
  <div class="row">
    <Toggle id="btn2" active={state.mode === 2} onClick={() => setMode(2)}>
      2 עיגולים
    </Toggle>

    <Toggle id="btn3" active={state.mode === 3} onClick={() => setMode(3)}>
      3 עיגולים
    </Toggle>
  </div>

  <div class="row">
    <input
      type="text"
      id="expression"
      bind:value={state.expression}
      on:input={() => correctExpression()}
      lang="en"
      autocapitalize="none"
      autocorrect="off"
    />
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

  input[type="text"] {
    padding: 12px;
    direction: ltr;
    flex: 1;
    border: 2px solid var(--border-light);
    border-radius: var(--radius-sm);
    font-size: 1.1rem;
    text-align: left;
  }

  input[type="text"]:focus {
    border-color: var(--color-primary);
    outline: none;
  }
</style>
