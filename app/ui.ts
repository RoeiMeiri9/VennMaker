import { getDimensions, createPngFromSvg } from "@core/render-service";
import { showImageModal } from "@core/modal-service";
import { renderDiagram } from "@core/render-service";
import { generateSVG } from "@core/svg-generator";
import { translateHebrewInput } from "@utils/hebrewToEnglish";
import { state } from "@core/states";

export async function copySVGAsImage() {
  const { w, h } = getDimensions(state.mode);
  const svgHtml = generateSVG(
    state.expression.value,
    w,
    h,
    undefined,
    true,
    state.mode,
  );

  const pngBlob = await createPngFromSvg(svgHtml, w, h);
  if (pngBlob) {
    showImageModal(pngBlob);
  }
}

export function initUI() {
  const { expression, btn2, btn3 } = state;

  expression.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    const correctedValue = translateHebrewInput(target.value);

    if (target.value !== correctedValue) {
      target.value = correctedValue;
    }
    renderDiagram();
  });

  btn2.onclick = () => setMode(2);
  btn3.onclick = () => setMode(3);

  window.renderDiagram = renderDiagram;
  window.copySVGAsImage = copySVGAsImage;

  renderDiagram();
}

function setMode(num: number) {
  state.mode = num;
  state.btn2.classList.toggle("active", num === 2);
  state.btn3.classList.toggle("active", num === 3);

  if (num === 2 && state.expression.value.includes("C")) {
    state.expression.value = "A - B";
  }
  renderDiagram();
}
