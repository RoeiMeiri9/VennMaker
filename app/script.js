let mode = 3;

const CONFIG = {
  3: {
    width: 400,
    height: 360,
    cA: { cx: 150, cy: 140, r: 90 },
    cB: { cx: 250, cy: 140, r: 90 },
    cC: { cx: 200, cy: 220, r: 90 },
  },
  2: {
    width: 400,
    height: 220,
    cA: { cx: 160, cy: 110, r: 90 }, // מרכזנו את העיגולים טוב יותר
    cB: { cx: 240, cy: 110, r: 90 },
  },
};

function getRegions(m = 1) {
  const A = { cx: 150 * m, cy: 140 * m, r: 90 * m };
  const B = { cx: 250 * m, cy: 140 * m, r: 90 * m };
  const C = { cx: 200 * m, cy: 220 * m, r: 90 * m };

  const A2 = { cx: 160 * m, cy: 110 * m, r: 90 * m };
  const B2 = { cx: 240 * m, cy: 110 * m, r: 90 * m };

  const w = 400 * m;
  const h3 = 360 * m;
  const h2 = 220 * m;

  if (mode === 3) {
    return [
      {
        mask: 1,
        draw: `<mask id="mA"><rect width="${w}" height="${h3}" fill="#fff"/><circle cx="${B.cx}" cy="${B.cy}" r="${B.r}" fill="#000"/><circle cx="${C.cx}" cy="${C.cy}" r="${C.r}" fill="#000"/></mask><g mask="url(#mA)"><circle cx="${A.cx}" cy="${A.cy}" r="${A.r}"/></g>`,
      },
      {
        mask: 2,
        draw: `<mask id="mB"><rect width="${w}" height="${h3}" fill="#fff"/><circle cx="${A.cx}" cy="${A.cy}" r="${A.r}" fill="#000"/><circle cx="${C.cx}" cy="${C.cy}" r="${C.r}" fill="#000"/></mask><g mask="url(#mB)"><circle cx="${B.cx}" cy="${B.cy}" r="${B.r}"/></g>`,
      },
      {
        mask: 4,
        draw: `<mask id="mC"><rect width="${w}" height="${h3}" fill="#fff"/><circle cx="${A.cx}" cy="${A.cy}" r="${A.r}" fill="#000"/><circle cx="${B.cx}" cy="${B.cy}" r="${B.r}" fill="#000"/></mask><g mask="url(#mC)"><circle cx="${C.cx}" cy="${C.cy}" r="${C.r}"/></g>`,
      },
      {
        mask: 3,
        draw: `<clipPath id="cAB"><circle cx="${A.cx}" cy="${A.cy}" r="${A.r}"/></clipPath><mask id="mAB"><rect width="${w}" height="${h3}" fill="#fff"/><circle cx="${C.cx}" cy="${C.cy}" r="${C.r}" fill="#000"/></mask><g clip-path="url(#cAB)" mask="url(#mAB)"><circle cx="${B.cx}" cy="${B.cy}" r="${B.r}"/></g>`,
      },
      {
        mask: 5,
        draw: `<clipPath id="cAC"><circle cx="${A.cx}" cy="${A.cy}" r="${A.r}"/></clipPath><mask id="mAC"><rect width="${w}" height="${h3}" fill="#fff"/><circle cx="${B.cx}" cy="${B.cy}" r="${B.r}" fill="#000"/></mask><g clip-path="url(#cAC)" mask="url(#mAC)"><circle cx="${C.cx}" cy="${C.cy}" r="${C.r}"/></g>`,
      },
      {
        mask: 6,
        draw: `<clipPath id="cBC"><circle cx="${B.cx}" cy="${B.cy}" r="${B.r}"/></clipPath><mask id="mBC"><rect width="${w}" height="${h3}" fill="#fff"/><circle cx="${A.cx}" cy="${A.cy}" r="${A.r}" fill="#000"/></mask><g clip-path="url(#cBC)" mask="url(#mBC)"><circle cx="${C.cx}" cy="${C.cy}" r="${C.r}"/></g>`,
      },
      {
        mask: 7,
        draw: `<clipPath id="cABC1"><circle cx="${A.cx}" cy="${A.cy}" r="${A.r}"/></clipPath><clipPath id="cABC2"><circle cx="${B.cx}" cy="${B.cy}" r="${B.r}"/></clipPath><g clip-path="url(#cABC1)"><g clip-path="url(#cABC2)"><circle cx="${C.cx}" cy="${C.cy}" r="${C.r}"/></g></g>`,
      },
    ];
  } else {
    return [
      {
        mask: 1,
        draw: `<mask id="mA2"><rect width="${w}" height="${h2}" fill="#fff"/><circle cx="${B2.cx}" cy="${B2.cy}" r="${B2.r}" fill="#000"/></mask><g mask="url(#mA2)"><circle cx="${A2.cx}" cy="${A2.cy}" r="${A2.r}"/></g>`,
      },
      {
        mask: 2,
        draw: `<mask id="mB2"><rect width="${w}" height="${h2}" fill="#fff"/><circle cx="${A2.cx}" cy="${A2.cy}" r="${A2.r}" fill="#000"/></mask><g mask="url(#mB2)"><circle cx="${B2.cx}" cy="${B2.cy}" r="${B2.r}"/></g>`,
      },
      {
        mask: 3,
        draw: `<clipPath id="cAB2"><circle cx="${A2.cx}" cy="${A2.cy}" r="${A2.r}"/></clipPath><g clip-path="url(#cAB2)"><circle cx="${B2.cx}" cy="${B2.cy}" r="${B2.r}"/></g>`,
      },
    ];
  }
}

function setCircles(num) {
  mode = num;
  document.getElementById("btn2").classList.toggle("active", num === 2);
  document.getElementById("btn3").classList.toggle("active", num === 3);
  if (num === 2 && document.getElementById("expression").value.includes("C")) {
    document.getElementById("expression").value = "A - B";
  }
  renderDiagram();
}

function parseExpression(expr, maskValue) {
  let clean = expr
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/U/g, "|")
    .replace(/N/g, "&")
    .replace(/\^/g, "^")
    .replace(/!/g, "!")
    .replace(/-/g, "&!");

  let a = maskValue & 1 ? "true" : "false";
  let b = maskValue & 2 ? "true" : "false";
  let c = maskValue & 4 ? "true" : "false";

  clean = clean
    .replace(/A/g, `(${a})`)
    .replace(/B/g, `(${b})`)
    .replace(/C/g, `(${c})`);

  try {
    return !!eval(clean);
  } catch (e) {
    throw new Error("שגיאה בניסוח הביטוי.");
  }
}

function generateSVG(
  exprInput,
  width,
  height,
  errorDiv = undefined,
  isLarge = false,
) {
  let svgHtml = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  svgHtml += `<defs><style>.outline{fill:none;stroke:#222;stroke-width:${isLarge ? 10 : 2.5}</style></defs>`;

  svgHtml += `<g fill="#34c759" fill-opacity="1" opacity="0.55">`;
  const m = isLarge ? 4 : 1;

  try {
    const regions = getRegions(m);
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

function renderDiagram() {
  const exprInput = document.getElementById("expression").value;
  const errorDiv = document.getElementById("error-msg");
  errorDiv.innerText = "";

  if (mode === 2 && exprInput.toUpperCase().includes("C")) {
    errorDiv.innerText = "שגיאה: במצב של 2 עיגולים אי אפשר להשתמש בקבוצה C.";
    return;
  }

  const width = 400;
  const height = mode === 3 ? 360 : 220;

  let svgHtml = generateSVG(exprInput, width, height, errorDiv, false);

  document.getElementById("svg-container").innerHTML = svgHtml;
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

renderDiagram();

const inputField = document.getElementById("expression");

inputField.addEventListener("input", (e) => {
  let value = e.target.value;

  const hebrewToEnglish = {
    ש: "A",
    נ: "B",
    ב: "C",
    ו: "u",
    מ: "n",
  };

  let correctedValue = value
    .split("")
    .map((char) => hebrewToEnglish[char] || char)
    .join("");

  if (value !== correctedValue) {
    e.target.value = correctedValue;
    renderDiagram();
  }
});

function copySVGAsImage() {
  const errorDiv = document.getElementById("error-msg");
  const exprInput = document.getElementById("expression").value;

  const width = 1600;
  const height = mode === 3 ? 1440 : 880;

  let svgHtml = generateSVG(exprInput, width, height, undefined, true);

  const svgBlob = new Blob([svgHtml], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  img.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0);

    canvas.toBlob(function (pngBlob) {
      const oldOverlay = document.getElementById("venn-overlay");
      if (oldOverlay) oldOverlay.remove();

      const overlay = document.createElement("div");
      overlay.id = "venn-overlay";

      const modal = document.createElement("div");
      modal.className = "venn-modal";

      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = "✕";
      closeBtn.className = "venn-modal-close";
      closeBtn.onclick = () => {
        overlay.remove();
      };

      const title = document.createElement("h3");
      title.innerText = "הדיאגרמה מוכנה להעתקה";
      title.className = "venn-modal-title";

      const subtitle = document.createElement("p");
      subtitle.innerHTML =
        '<strong>לחץ לחיצה ארוכה</strong> על התמונה מטה,<br>ובחר <strong>"העתק" (Copy)</strong> כדי להדביק בנוטאביליטי.';
      subtitle.className = "venn-modal-subtitle";

      const tempImg = document.createElement("img");
      tempImg.src = URL.createObjectURL(pngBlob);
      tempImg.className = "venn-modal-img";

      modal.appendChild(closeBtn);
      modal.appendChild(title);
      modal.appendChild(subtitle);
      modal.appendChild(tempImg);
      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      setTimeout(() => {
        overlay.style.opacity = "1";
        modal.style.transform = "scale(1)";
      }, 10);
      overlay.onclick = function (e) {
        if (e.target === overlay) overlay.remove();
      };

      URL.revokeObjectURL(url);
    }, "image/png");
  };

  img.src = url;
}

window.copySVGAsImage = copySVGAsImage;
window.renderDiagram = renderDiagram;
window.setCircles = setCircles;

import renderMathInElement from "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.mjs";

document.addEventListener("DOMContentLoaded", () => {
  renderMathInElement(document.body, {
    delimiters: [{ left: "$", right: "$", display: false }],
  });
});
