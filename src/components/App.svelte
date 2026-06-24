<script lang="ts">
  import VennDiagramCanvas from "@components/VennDiagram/VennDiagramCanvas.svelte";
  import Legend from "@components/Legend.svelte";
  import Controls from "@components/Controls.svelte";
</script>

<div class="container">
  <h1>מחולל דיאגרמות וון וקטורי</h1>
  <p class="subtitle">הזן ביטוי מתמטי לקבלת צביעה מדויקת של אזורי חפיפה</p>

  <Controls />

  <VennDiagramCanvas />

  <Legend />
</div>
