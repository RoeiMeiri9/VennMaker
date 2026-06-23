<script lang="ts">
  import { renderMathSymbols, setMode } from "@src/ui";
  import { correctExpression } from "@src/utils/parseExpression";
  import { onMount } from "svelte";
  import MathSym from "@components/MathSym.svelte";
  import { state } from "@src/states.svelte";
  import VennDiagramCanvas from "@components/VennDiagram/VennDiagramCanvas.svelte";

  onMount(() => {
    renderMathSymbols();
  });
</script>

<div class="container">
  <h1>מחולל דיאגרמות וון וקטורי</h1>
  <p class="subtitle">הזן ביטוי מתמטי לקבלת צביעה מדויקת של אזורי חפיפה</p>

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

  <VennDiagramCanvas />

  <div class="legend">
    <div class="legend-title">מדריך סימנים מהיר</div>

    <div class="legend-grid">
      <div class="legend-item">
        <span class="key">U</span> איחוד
        <MathSym formula="(A \cup B)" />
      </div>
      <div class="legend-item">
        <span class="key">n</span> חיתוך
        <MathSym formula="(A \cap B)" />
      </div>
      <div class="legend-item">
        <span class="key">-</span> הפרש / חיסור
        <MathSym formula="(A \setminus B)" />
      </div>
      <div class="legend-item">
        <span class="key">^</span> הפרש סימטרי
        <MathSym formula="(A \oplus B)" />
      </div>
      <div class="legend-item">
        <span class="key">!</span> משלים
        <MathSym formula={"(\\overline{A})"} />
      </div>
    </div>

    <div class="legend-examples">
      <strong>דוגמאות לשימוש:</strong>
      <code class="ex">A - B</code>
      <code class="ex">A - (B n C)</code>
      <code class="ex">(A U B) - C</code>
    </div>
  </div>
</div>
