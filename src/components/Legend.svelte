<script lang="ts">
  import MathSym from "@components/MathSym.svelte";
</script>

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

<style>
</style>
