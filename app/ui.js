import { generateSVG } from "./svg-generator.js";
import { translateHebrewInput } from "./utils.js";

let mode = 3;

export function initUI() {
  const inputField = document.getElementById("expression");

  inputField.addEventListener("input", (e) => {
    let value = e.target.value;
    let correctedValue = translateHebrewInput(value);

    if (value !== correctedValue) {
      e.target.value = correctedValue;
      renderDiagram();
    }
  });

  window.setCircles = setCircles;
  window.renderDiagram = renderDiagram;
  window.copySVGAsImage = copySVGAsImage;

  renderDiagram();
}

export function setCircles(num) {
  mode = num;
  document.getElementById("btn2").classList.toggle("active", num === 2);
  document.getElementById("btn3").classList.toggle("active", num === 3);
  if (num === 2 && document.getElementById("expression").value.includes("C")) {
    document.getElementById("expression").value = "A - B";
  }
  renderDiagram();
}

export function renderDiagram() {
  const exprInput = document.getElementById("expression").value;
  const errorDiv = document.getElementById("error-msg");
  errorDiv.innerText = "";

  if (mode === 2 && exprInput.toUpperCase().includes("C")) {
    errorDiv.innerText = "שגיאה: במצב של 2 עיגולים אי אפשר להשתמש בקבוצה C.";
    return;
  }

  const width = 400;
  const height = mode === 3 ? 360 : 220;

  let svgHtml = generateSVG(exprInput, width, height, errorDiv, false, mode);

  document.getElementById("svg-container").innerHTML = svgHtml;
}

export function copySVGAsImage() {
  const exprInput = document.getElementById("expression").value;

  const width = 1600;
  const height = mode === 3 ? 1440 : 880;

  let svgHtml = generateSVG(exprInput, width, height, undefined, true, mode);

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
