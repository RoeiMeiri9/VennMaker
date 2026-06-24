<script lang="ts">
  import { correctExpression } from "@src/utils/parseExpression";
  import { state } from "@src/states.svelte";

  function setMode(num: 2 | 3) {
    state.mode = num;

    if (num === 2 && state.expression.includes("C")) {
      state.expression = "A - B";
    }
  }
</script>

<div class="controls">
  <div class="row">
    <button
      id="btn2"
      class="toggle-btn"
      class:active={state.mode === 2}
      on:click={() => setMode(2)}
    >
      2 עיגולים
    </button>
    <button
      id="btn3"
      class="toggle-btn"
      class:active={state.mode === 3}
      on:click={() => setMode(3)}
    >
      3 עיגולים
    </button>
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
</style>
