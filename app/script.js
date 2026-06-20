let mode = 3; // מצב ברירת מחדל: 3 עיגולים

// הגדרות גלובליות של המעגלים (מיקומים ורדיוסים קבועים)
const circA3 = '<circle cx="150" cy="140" r="90" />';
const circB3 = '<circle cx="250" cy="140" r="90" />';
const circC3 = '<circle cx="200" cy="220" r="90" />';

const circA2 = '<circle cx="160" cy="100" r="80" />';
const circB2 = '<circle cx="240" cy="100" r="80" />';

/* מערך האזורים ל-3 עיגולים.
      mask: מפת ביטים (Bitmask) לייצוג הלוגי (A=1, B=2, C=4).
      draw: שימוש ב-mask של SVG. לבן (#fff) משאיר את הצבע, שחור (#000) מוחק אותו.
    */
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

// שינוי מצב בין 2 ל-3 עיגולים
function setCircles(num) {
  mode = num;
  document.getElementById("btn2").classList.toggle("active", num === 2);
  document.getElementById("btn3").classList.toggle("active", num === 3);
  if (num === 2 && document.getElementById("expression").value.includes("C")) {
    document.getElementById("expression").value = "A - B";
  }
  renderDiagram();
}

// פארסר: הופך את הביטוי המתמטי ללוגיקה שהדפדפן מבין (true/false) עבור כל אזור
function parseExpression(expr, maskValue) {
  let clean = expr
    .toUpperCase()
    .replace(/\s+/g, "") // הסרת רווחים
    .replace(/U/g, "|") // איחוד = OR
    .replace(/N/g, "&") // חיתוך = AND
    .replace(/\^/g, "^") // הפרש סימטרי = XOR
    .replace(/!/g, "!") // משלים = NOT
    .replace(/-/g, "&!"); // הפרש (חיסור): A - B פירושו A AND NOT B

  // בדיקה האם הקבוצות מוכלות באזור הנוכחי לפי ה-Bitmask
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

// פונקציית הרינדור הראשית
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

  /* קבוצת הצביעה הראשית (<g>):
          כדי למנוע הבדלי גוונים וכפל צבעים, השקיפות (opacity) מוגדרת פעם אחת על כל השכבה.
          הצבע הפנימי הוא אטום לחלוטין (fill-opacity="1"), מה שגורם לכל החלקים להתמזג פלאט.
        */
  svgHtml += `<g fill="#34c759" fill-opacity="1" opacity="0.55">`;
  try {
    if (mode === 3) {
      // לולאה על 7 האזורים המוגדרים
      regions3.forEach((reg) => {
        if (parseExpression(exprInput, reg.mask)) {
          svgHtml += reg.draw; // הזרקת האלמנט הגיאומטרי המוכן של האזור
        }
      });
    } else {
      // לוגיקה פשוטה ל-2 עיגולים
      if (parseExpression(exprInput, 1))
        svgHtml += `<g clip-path="url(#clipA2_inv)"><circle cx="160" cy="100" r="80" /></g>`;
      if (parseExpression(exprInput, 2))
        svgHtml += `<g clip-path="url(#clipB2_inv)"><circle cx="240" cy="100" r="80" /></g>`;
      if (parseExpression(exprInput, 3))
        svgHtml += `<g clip-path="url(#clipA2)"><circle cx="240" cy="100" r="80" /></g>`;

      // תוספת הגדרות חיתוך ספציפיות ל-2 עיגולים (למקרה של איחוד/חיתוך)
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

  // שכבה עליונה: ציור קווי המתאר השחורים והטקסטים (כדי שלא יכוסו ע"י הצבע)
  if (mode === 3) {
    svgHtml += `<g class="outline">${circA3}${circB3}${circC3}</g>`;
    svgHtml += `<text x="70" y="100" font-size="20" font-weight="bold">A</text>`;
    svgHtml += `<text x="320" y="100" font-size="20" font-weight="bold">B</text>`;
    svgHtml += `<text x="200" y="330" font-size="20" font-weight="bold" text-anchor="middle">C</text>`;
  } else {
    svgHtml += `<g class="outline">${circA2}${circB2}</g>`;
    svgHtml += `<text x="90" y="105" font-size="20" font-weight="bold" text-anchor="middle">A</text>`;
    svgHtml += `<text x="310" y="105" font-size="20" font-weight="bold" text-anchor="middle">B</text>`;
  }

  svgHtml += `</svg>`;
  document.getElementById("svg-container").innerHTML = svgHtml;
}

// הרצה ראשונית אוטומטית עם טעינת הדף
renderDiagram();

const inputField = document.getElementById("expression");

inputField.addEventListener("input", (e) => {
  let value = e.target.value;

  // מפת תרגום זריזה של האותיות הרלוונטיות מעברית לאנגלית (לפי המיקום במקלדת)
  const hebrewToEnglish = {
    ש: "A",
    נ: "B",
    ב: "C",
    ו: "u",
    מ: "n",
  };

  // החלפת האותיות בהתאם למפה
  let correctedValue = value
    .split("")
    .map((char) => hebrewToEnglish[char] || char)
    .join("");

  if (value !== correctedValue) {
    e.target.value = correctedValue;
    renderDiagram(); // מרנדר מחדש אוטומטית עם האות הנכונה
  }
});

function copySVGAsImage() {
  const errorDiv = document.getElementById("error-msg");
  const exprInput = document.getElementById("expression").value;

  // 1. הגדרת מידות ענקיות (פי 4) ישירות כבסיס
  const width = 1600;
  const height = mode === 3 ? 1440 : 880;

  // 2. בניית גרסה מוגדלת של המעגלים (הכל מוכפל פי 4 מהמקור)
  const circA3_large = '<circle cx="600" cy="560" r="360" />';
  const circB3_large = '<circle cx="1000" cy="560" r="360" />';
  const circC3_large = '<circle cx="800" cy="880" r="360" />';

  const circA2_large = '<circle cx="640" cy="400" r="320" />';
  const circB2_large = '<circle cx="960" cy="400" r="320" />';

  // מערך האזורים ל-3 עיגולים בגרסה הגדולה
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

  // 3. בניית מחרוזת ה-SVG הגדולה מאפס
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

  // קווים ואותיות במיקומים מוגדלים ומדויקים (פי 4 מהמיקומים ב-UI)
  if (mode === 3) {
    svgHtml += `<g class="outline">${circA3_large}${circB3_large}${circC3_large}</g>`;
    svgHtml += `<text x="180" y="440" font-size="88" font-weight="bold" font-family="system-ui">A</text>`;
    svgHtml += `<text x="1360" y="440" font-size="88" font-weight="bold" font-family="system-ui">B</text>`;
    svgHtml += `<text x="800" y="1360" font-size="88" font-weight="bold" font-family="system-ui" text-anchor="middle">C</text>`;
  } else {
    svgHtml += `<g class="outline">${circA2_large}${circB2_large}</g>`;
    svgHtml += `<text x="260" y="420" font-size="88" font-weight="bold" font-family="system-ui" text-anchor="middle">A</text>`;
    svgHtml += `<text x="1340" y="420" font-size="88" font-weight="bold" font-family="system-ui" text-anchor="middle">B</text>`;
  }
  svgHtml += `</svg>`;

  // 4. יצירת ה-Blob והקנבס מה-SVG הגדול החדש
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
    ctx.drawImage(img, 0, 0); // ציור פשוט 1:1, בלי מתיחות ובלי הפתעות

    canvas.toBlob(function (pngBlob) {
      const oldOverlay = document.getElementById("venn-overlay");
      if (oldOverlay) oldOverlay.remove();

      // בניית ה-Overlay המעוצב
      const overlay = document.createElement("div");
      overlay.id = "venn-overlay";
      overlay.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background-color: rgba(0, 0, 0, 0.4); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                z-index: 9999; opacity: 0; transition: opacity 0.3s ease; font-family: system-ui, -apple-system, sans-serif;
            `;

      const modal = document.createElement("div");
      modal.style.cssText = `
                background: white; padding: 24px; border-radius: 20px; box-shadow: 0 12px 40px rgba(0,0,0,0.25);
                max-width: 90%; width: 450px; text-align: center; position: relative; transform: scale(0.9); transition: transform 0.3s ease;
            `;

      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = "✕";
      closeBtn.style.cssText = `
                position: absolute; top: 16px; right: 16px; background: #f0f0f5; border: none; width: 32px; height: 32px;
                border-radius: 50%; font-size: 14px; cursor: pointer; color: #666; display: flex; align-items: center; justify-content: center; font-weight: bold;
            `;
      closeBtn.onclick = () => {
        overlay.remove();
      };

      const title = document.createElement("h3");
      title.innerText = "הדיאגרמה מוכנה להעתקה";
      title.style.cssText =
        "margin: 0 0 8px 0; color: #1a1a1a; font-size: 1.2rem;";

      const subtitle = document.createElement("p");
      subtitle.innerHTML =
        '<strong>לחץ לחיצה ארוכה</strong> על התמונה מטה,<br>ובחר <strong>"העתק" (Copy)</strong> כדי להדביק בנוטאביליטי.';
      subtitle.style.cssText =
        "margin: 0 0 20px 0; color: #666; font-size: 0.95rem; line-height: 1.4;";

      const tempImg = document.createElement("img");
      tempImg.src = URL.createObjectURL(pngBlob);
      tempImg.style.cssText =
        "max-width: 100%; height: auto; border-radius: 12px; border: 1px solid #e5e5ea; background: #fff; -webkit-touch-callout: default;";

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
