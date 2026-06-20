export function getRegions(m = 1, mode = 3) {
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
