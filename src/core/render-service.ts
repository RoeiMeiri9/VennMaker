import { state } from "@core/states";
import { generateSVG } from "@core/svg-generator";

export function getDimensions(mode: number) {
  return mode === 3 ? { w: 1600, h: 1440 } : { w: 1600, h: 880 };
}

export function createPngFromSvg(
  svgHtml: string,
  width: number,
  height: number,
): Promise<Blob | null> {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob(resolve, "image/png");
    };
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgHtml)}`;
  });
}

export function renderDiagram() {
  state.errorDiv.innerText = "";

  if (state.mode === 2 && state.expression.value.toUpperCase().includes("C")) {
    state.errorDiv.innerText =
      "שגיאה: במצב של 2 עיגולים אי אפשר להשתמש בקבוצה C.";
    return;
  }

  const width = 400;
  const height = state.mode === 3 ? 360 : 220;

  let svgHtml = generateSVG(
    state.expression.value,
    width,
    height,
    state.errorDiv,
    false,
    state.mode,
  );

  state.svgContainer.innerHTML = svgHtml;
}
