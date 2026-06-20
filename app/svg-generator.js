import { getRegions } from "./svg-regions.js";
import { parseExpression } from "./utils.js";
import { CONFIG } from "./config.js";

export function generateSVG(
  exprInput,
  width,
  height,
  errorDiv = undefined,
  isLarge = false,
  mode = 3,
) {
  let svgHtml = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  svgHtml += `<defs><style>.outline{fill:none;stroke:#222;stroke-width:${isLarge ? 10 : 2.5}</style></defs>`;

  svgHtml += `<g fill="#34c759" fill-opacity="1" opacity="0.55">`;
  const m = isLarge ? 4 : 1;

  try {
    const regions = getRegions(m, mode);
    regions.forEach((reg) => {
      if (parseExpression(exprInput, reg.mask)) svgHtml += reg.draw;
    });
  } catch (err) {
    if (errorDiv) errorDiv.innerText = "שגיאה בביטוי המתמטי.";
    else alert("שגיאה בביטוי המתמטי.");
    console.error(err);
    return;
  }
  svgHtml += `</g>`;

  svgHtml = placeObjectsInSVG(svgHtml, mode, m);

  svgHtml += `</svg>`;
  return svgHtml;
}

function placeObjectsInSVG(svgHtml, mode, m = 1) {
  const cfg = CONFIG[mode];

  let outlines = "";
  if (mode === 3) {
    outlines = `<circle cx="${cfg.cA.cx * m}" cy="${cfg.cA.cy * m}" r="${cfg.cA.r * m}" /><circle cx="${cfg.cB.cx * m}" cy="${cfg.cB.cy * m}" r="${cfg.cB.r * m}" /><circle cx="${cfg.cC.cx * m}" cy="${cfg.cC.cy * m}" r="${cfg.cC.r * m}" />`;
  } else {
    outlines = `<circle cx="${cfg.cA.cx * m}" cy="${cfg.cA.cy * m}" r="${cfg.cA.r * m}" /><circle cx="${cfg.cB.cx * m}" cy="${cfg.cB.cy * m}" r="${cfg.cB.r * m}" />`;
  }
  svgHtml += `<g class="outline">${outlines}</g>`;

  const fontSize = 22 * m;
  const paddingLR = 110;
  const labels =
    mode === 3
      ? [
          { text: "A", x: cfg.cA.cx - paddingLR, y: cfg.cA.cy },
          { text: "B", x: cfg.cB.cx + paddingLR, y: cfg.cB.cy },
          { text: "C", x: cfg.cC.cx, y: cfg.cC.cy + 120 },
        ]
      : [
          { text: "A", x: cfg.cA.cx - paddingLR, y: cfg.cA.cy },
          { text: "B", x: cfg.cB.cx + paddingLR, y: cfg.cB.cy },
        ];

  labels.forEach((label) => {
    svgHtml += `<text x="${label.x * m}" y="${label.y * m}" font-size="${fontSize}" font-weight="bold" font-family="system-ui" text-anchor="middle">${label.text}</text>`;
  });

  return svgHtml;
}
