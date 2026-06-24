<script lang="ts">
  import venn-diagramCanvas from "@components/venn-diagram/venn-diagramCanvas.svelte";
  import Legend from "@components/Legend.svelte";
  import Controls from "@components/controls/Controls.svelte";
</script>

<div class="container">
  <h1>מחולל דיאגרמות וון וקטורי</h1>
  <p class="subtitle">הזן ביטוי מתמטי לקבלת צביעה מדויקת של אזורי חפיפה</p>
  <Controls />
  <venn-diagramCanvas />
  <Legend />
</div>

<style>
  .container {
    width: 100%;
    max-width: 600px;
    padding: 25px;
    background: var(--bg-surface);
    box-shadow: var(--shadow-sm);
    border-radius: var(--radius-lg);
    text-align: center;
  }
</style>
