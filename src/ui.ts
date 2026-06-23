import { state } from "@src/states.svelte";

import katex from "katex";
import "katex/dist/katex.min.css";

// export async function copySVGAsImage() {
//   const { w, h } = getDimensions(state.mode);
//   const svgHtml = generateSVG(w, h, true);

//   const pngBlob = await createPngFromSvg(svgHtml, w, h);
//   if (pngBlob) {
//     showImageModal(pngBlob);
//   }
// }

export function renderMathSymbols() {
  const mathSymList = document.querySelectorAll<HTMLElement>(".math-sym");

  mathSymList.forEach((mathSym) => {
    // נקה את הדולרים לפני השליחה כדי למנוע את השגיאה שראינו קודם
    const formula = mathSym.innerText.trim().replace(/\$/g, "");

    try {
      katex.render(formula, mathSym, {
        throwOnError: true,
        displayMode: true,
      });
    } catch (e) {
      console.error(`Error rendering formula: "${formula}"`, e);
    }
  });
}

export function setMode(num: 2 | 3) {
  state.mode = num;

  if (num === 2 && state.expression.includes("C")) {
    state.expression = "A - B";
  }
}
