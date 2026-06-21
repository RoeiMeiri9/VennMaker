import { initUI, renderMathSymbols } from "@app/ui";
import { renderDiagram } from "@core/render-service";
document.addEventListener("DOMContentLoaded", () => {
  initUI();
  renderDiagram();
  renderMathSymbols();
});
