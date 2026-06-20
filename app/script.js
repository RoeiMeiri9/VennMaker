let mode = 3;

const circA3 = '<circle cx="150" cy="140" r="90" />';
const circB3 = '<circle cx="250" cy="140" r="90" />';
const circC3 = '<circle cx="200" cy="220" r="90" />';

const circA2 = '<circle cx="160" cy="100" r="80" />';
const circB2 = '<circle cx="240" cy="100" r="80" />';

const regions3 = [
  {
    id: "A_only",
    mask: 1,
    draw: `<mask id="mA_only"><rect width="400" height="360" fill="#fff"/> ${circB3.replace("/>", 'fill="#000"/>')} ${circC3.replace("/>", 'fill="#000"/>')} </mask><g mask="url(#mA_only)">${circA3}</g>`,
  },
  {
    id: "B_only",
    mask: 2,
    draw: `<mask id="mB_only"><rect width="400" height="360" fill="#fff"/> ${circA3.replace("/>", 'fill="#000"/>')} ${circC3.replace("/>", 'fill="#000"/>')} </mask><g mask="url(#mB_only)">${circB3}</g>`,
  },
  {
    id: "C_only",
    mask: 4,
    draw: `<mask id="mC_only"><rect width="400" height="360" fill="#fff"/> ${circA3.replace("/>", 'fill="#000"/>')} ${circB3.replace("/>", 'fill="#000"/>')} </mask><g mask="url(#mC_only)">${circC3}</g>`,
  },
  {
    id: "A_n_B_only",
    mask: 3,
    draw: `<clipPath id="cAB">${circA3}</clipPath><mask id="mAB"><rect width="400" height="360" fill="#fff"/> ${circC3.replace("/>", 'fill="#000"/>')} </mask><g clip-path="url(#cAB)" mask="url(#mAB)">${circB3}</g>`,
  },
  {
    id: "A_n_C_only",
    mask: 5,
    draw: `<clipPath id="cAC">${circA3}</clipPath><mask id="mAC"><rect width="400" height="360" fill="#fff"/> ${circB3.replace("/>", 'fill="#000"/>')} </mask><g clip-path="url(#cAC)" mask="url(#mAC)">${circC3}</g>`,
  },
  {
    id: "B_n_C_only",
    mask: 6,
    draw: `<clipPath id="cBC">${circB3}</clipPath><mask id="mBC"><rect width="400" height="360" fill="#fff"/> ${circA3.replace("/>", 'fill="#000"/>')} </mask><g clip-path="url(#cBC)" mask="url(#mBC)">${circC3}</g>`,
  },
  {
    id: "A_n_B_n_C",
    mask: 7,
    draw: `<clipPath id="cABC_A">${circA3}</clipPath><clipPath id="cABC_B">${circB3}</clipPath><g clip-path="url(#cABC_A)"><g clip-path="url(#cABC_B)">${circC3}</g></g>`,
  },
];

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

  clean = clean.replace(/A/g, a).replace(/B/g, b).replace(/C/g, c);

  try {
    return eval(clean);
  } catch (e) {
    throw new Error("שגיאה בניסוח הביטוי.");
  }
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

  let svgHtml = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  svgHtml += `<defs><style>.outline{fill:none;stroke:#222;stroke-width:2.5;}</style></defs>`;

  svgHtml += `<g fill="#34c759" fill-opacity="1" opacity="0.55">`;
  try {
    if (mode === 3) {
      regions3.forEach((reg) => {
        if (parseExpression(exprInput, reg.mask)) {
          svgHtml += reg.draw;
        }
      });
    } else {
      if (parseExpression(exprInput, 1))
        svgHtml += `<g clip-path="url(#clipA2_inv)"><circle cx="160" cy="100" r="80" /></g>`;
      if (parseExpression(exprInput, 2))
        svgHtml += `<g clip-path="url(#clipB2_inv)"><circle cx="240" cy="100" r="80" /></g>`;
      if (parseExpression(exprInput, 3))
        svgHtml += `<g clip-path="url(#clipA2)"><circle cx="240" cy="100" r="80" /></g>`;

      svgHtml = svgHtml.replace(
        "<defs>",
        `<defs><clipPath id="clipA2">${circA2}</clipPath><clipPath id="clipB2">${circB2}</clipPath>`,
      );
    }
  } catch (err) {
    errorDiv.innerText = "שגיאה בביטוי המתמטי. ודא שסגרת סוגריים.";
    return;
  }
  svgHtml += `</g>`;

  svgHtml = placeText(svgHtml, mode, circA3, circB3, circC3, circA2, circB2);

  svgHtml += `</svg>`;
  document.getElementById("svg-container").innerHTML = svgHtml;
}

function placeText(
  svgHtml,
  mode,
  circA3,
  circB3,
  circC3,
  circA2,
  circB2,
  multiply = 1,
) {
  if (mode === 3) {
    svgHtml += `<g class="outline">${circA3}${circB3}${circC3}</g>`;

    svgHtml += `<text x="${45 * multiply}" y="${110 * multiply}" font-size="${22 * multiply}" font-weight="bold" font-family="system-ui" text-anchor="middle">A</text>`;
    svgHtml += `<text x="${355 * multiply}" y="${110 * multiply}" font-size="${22 * multiply}" font-weight="bold" font-family="system-ui" text-anchor="middle">B</text>`;
    svgHtml += `<text x="${200 * multiply}" y="${340 * multiply}" font-size="${22 * multiply}" font-weight="bold" font-family="system-ui" text-anchor="middle">C</text>`;
  } else {
    svgHtml += `<g class="outline">${circA2}${circB2}</g>`;

    svgHtml += `<text x="${60 * multiply}" y="${105 * multiply}" font-size="${22 * multiply}" font-weight="bold" font-family="system-ui" text-anchor="middle">A</text>`;
    svgHtml += `<text x="${340 * multiply}" y="${105 * multiply}" font-size="${22 * multiply}" font-weight="bold" font-family="system-ui" text-anchor="middle">B</text>`;
  }

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

  const circA3_large = '<circle cx="600" cy="560" r="360" />';
  const circB3_large = '<circle cx="1000" cy="560" r="360" />';
  const circC3_large = '<circle cx="800" cy="880" r="360" />';

  const circA2_large = '<circle cx="640" cy="400" r="320" />';
  const circB2_large = '<circle cx="960" cy="400" r="320" />';

  const regions3_large = [
    {
      mask: 1,
      draw: `<mask id="mA_only_l"><rect width="1600" height="1440" fill="#fff"/> ${circB3_large.replace("/>", 'fill="#000"/>')} ${circC3_large.replace("/>", 'fill="#000"/>')} </mask><g mask="url(#mA_only_l)">${circA3_large}</g>`,
    },
    {
      mask: 2,
      draw: `<mask id="mB_only_l"><rect width="1600" height="1440" fill="#fff"/> ${circA3_large.replace("/>", 'fill="#000"/>')} ${circC3_large.replace("/>", 'fill="#000"/>')} </mask><g mask="url(#mB_only_l)">${circB3_large}</g>`,
    },
    {
      mask: 4,
      draw: `<mask id="mC_only_l"><rect width="1600" height="1440" fill="#fff"/> ${circA3_large.replace("/>", 'fill="#000"/>')} ${circB3_large.replace("/>", 'fill="#000"/>')} </mask><g mask="url(#mC_only_l)">${circC3_large}</g>`,
    },
    {
      mask: 3,
      draw: `<clipPath id="cAB_l">${circA3_large}</clipPath><mask id="mAB_l"><rect width="1600" height="1440" fill="#fff"/> ${circC3_large.replace("/>", 'fill="#000"/>')} </mask><g clip-path="url(#cAB_l)" mask="url(#mAB_l)">${circB3_large}</g>`,
    },
    {
      mask: 5,
      draw: `<clipPath id="cAC_l">${circA3_large}</clipPath><mask id="mAC_l"><rect width="1600" height="1440" fill="#fff"/> ${circB3_large.replace("/>", 'fill="#000"/>')} </mask><g clip-path="url(#cAC_l)" mask="url(#mAC_l)">${circC3_large}</g>`,
    },
    {
      mask: 6,
      draw: `<clipPath id="cBC_l">${circB3_large}</clipPath><mask id="mBC_l"><rect width="1600" height="1440" fill="#fff"/> ${circA3_large.replace("/>", 'fill="#000"/>')} </mask><g clip-path="url(#cBC_l)" mask="url(#mBC_l)">${circC3_large}</g>`,
    },
    {
      mask: 7,
      draw: `<clipPath id="cABC_A_l">${circA3_large}</clipPath><clipPath id="cABC_B_l">${circB3_large}</clipPath><g clip-path="url(#cABC_A_l)"><g clip-path="url(#cABC_B_l)">${circC3_large}</g></g>`,
    },
  ];

  let svgHtml = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  svgHtml += `<defs><style>.outline{fill:none;stroke:#222;stroke-width:10;}</style></defs>`; // קו עבה יותר (10) שיתאים לרזולוציה
  svgHtml += `<g fill="#34c759" fill-opacity="1" opacity="0.55">`;

  try {
    if (mode === 3) {
      regions3_large.forEach((reg) => {
        if (parseExpression(exprInput, reg.mask)) svgHtml += reg.draw;
      });
    } else {
      if (parseExpression(exprInput, 1))
        svgHtml += `<g clip-path="url(#clipA2_l_inv)">${circA2_large}</g>`;
      if (parseExpression(exprInput, 2))
        svgHtml += `<g clip-path="url(#clipB2_l_inv)">${circB2_large}</g>`;
      if (parseExpression(exprInput, 3))
        svgHtml += `<g clip-path="url(#clipA2_l)">${circB2_large}</g>`;
      svgHtml = svgHtml.replace(
        "<defs>",
        `<defs><clipPath id="clipA2_l">${circA2_large}</clipPath><clipPath id="clipB2_l">${circB2_large}</clipPath>`,
      );
    }
  } catch (err) {
    alert("שגיאה בביטוי המתמטי.");
    return;
  }
  svgHtml += `</g>`;

  svgHtml = placeText(
    svgHtml,
    mode,
    circA3_large,
    circB3_large,
    circC3_large,
    circA2_large,
    circB2_large,
    4,
  );

  svgHtml += `</svg>`;

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
