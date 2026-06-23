// function placeObjectsInSVG(svgHtml: string, mode: number, m: number = 1) {
//   const cfg = CONFIG[mode];
//   if (!cfg) return "";

//   let outlines = "";
//   if (mode === 3) {
//     outlines = `<circle cx="${cfg.cA.cx * m}" cy="${cfg.cA.cy * m}" r="${cfg.cA.r * m}" /><circle cx="${cfg.cB.cx * m}" cy="${cfg.cB.cy * m}" r="${cfg.cB.r * m}" /><circle cx="${(cfg.cC?.cx || 1) * m}" cy="${(cfg.cC?.cy || 1) * m}" r="${(cfg.cC?.r || 1) * m}" />`;
//   } else {
//     outlines = `<circle cx="${cfg.cA.cx * m}" cy="${cfg.cA.cy * m}" r="${cfg.cA.r * m}" /><circle cx="${cfg.cB.cx * m}" cy="${cfg.cB.cy * m}" r="${cfg.cB.r * m}" />`;
//   }
//   svgHtml += `<g class="outline">${outlines}</g>`;

//   const fontSize = 22 * m;
//   const paddingLR = 110;
//   const labels =
//     mode === 3
//       ? [
//           { text: "A", x: cfg.cA.cx - paddingLR, y: cfg.cA.cy },
//           { text: "B", x: cfg.cB.cx + paddingLR, y: cfg.cB.cy },
//           { text: "C", x: cfg.cC?.cx, y: (cfg.cC?.cy || 0) + 120 },
//         ]
//       : [
//           { text: "A", x: cfg.cA.cx - paddingLR, y: cfg.cA.cy },
//           { text: "B", x: cfg.cB.cx + paddingLR, y: cfg.cB.cy },
//         ];

//   labels.forEach((label) => {
//     svgHtml += `<text x="${(label.x || 1) * m}" y="${(label.y || 1) * m}" font-size="${fontSize}" font-weight="bold" font-family="system-ui" text-anchor="middle">${label.text}</text>`;
//   });

//   return svgHtml;
// }
