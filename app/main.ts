import { initUI, renderMathSymbols } from "@app/ui";
import { renderDiagram } from "@core/render-service";
import "katex/dist/katex.min.css";

document.addEventListener("DOMContentLoaded", () => {
  initUI();
  renderDiagram();
  renderMathSymbols();
});
