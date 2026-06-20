import { initUI } from "./ui.js";
import renderMathInElement from "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.mjs";

document.addEventListener("DOMContentLoaded", () => {
  initUI();

  renderMathInElement(document.body, {
    delimiters: [{ left: "$", right: "$", display: false }],
  });
});
