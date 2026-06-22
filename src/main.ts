import { initUI, renderMathSymbols } from "@src/ui";
import { renderDiagram } from "@core/render-service";
import "katex/dist/katex.min.css";

document.addEventListener("DOMContentLoaded", () => {
  initUI();
  renderDiagram();
  renderMathSymbols();
});
