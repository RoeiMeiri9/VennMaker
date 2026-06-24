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
  .legend {
    margin-top: 24px;
    padding: 16px;
    direction: rtl;
    background-color: var(--bg-light);
    border: 1px solid var(--bg-muted);
    border-radius: var(--radius-md);
    font-family: var(--font-base);
    text-align: right;
  }

  .legend-title {
    margin-bottom: 12px;
    color: var(--text-dark);
    font-size: 0.95rem;
    font-weight: 700;
  }

  .legend-grid {
    margin-bottom: 14px;
    padding-bottom: 12px;
    display: grid;
    gap: 12px;
    border-bottom: 1px dashed var(--bg-muted);
  }

  .legend-item {
    display: flex;
    gap: 6px;
    align-items: center;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  .legend .key {
    padding: 2px 8px;
    background: var(--bg-muted);
    border-radius: var(--radius-xs);
    color: var(--text-key);
    font-size: 0.95rem;
    font-family: var(--font-mono);
    font-weight: bold;
  }

  .legend-examples {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    color: var(--text-examples);
    font-size: 0.85rem;
  }

  .legend .ex {
    padding: 3px 8px;
    direction: ltr;
    background: var(--bg-surface);
    border: 1px solid var(--border-ex);
    border-radius: var(--radius-xs);
    font-family: var(--font-mono);
  }
</style>
