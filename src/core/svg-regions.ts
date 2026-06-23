import type { MaskCircles, Region } from "@src/components/VennDiagram/types";
import { parseExpression } from "@src/utils/parseExpression";
import { state } from "./states.svelte";
import { CONFIG } from "@src/config";

export function getRegions(mode = 3): Region[] {
  const { cA, cB, cC } = CONFIG[state.mode];

  // הגדרות מסכות לפי המבנה שלך
  const maskA: MaskCircles = { circle: cA, id: "mA" + state.mode };
  const maskB: MaskCircles = { circle: cB, id: "mB" + state.mode };
  const maskC: MaskCircles = { circle: cC!, id: "mC" + state.mode };

  if (mode === 3) {
    return [
      {
        maskNumber: 1,
        config: {
          targetCircle: cA,
          maskCircles: [maskB, maskC],
          clipCircles: [],
        },
      },
      {
        maskNumber: 2,
        config: {
          targetCircle: cB,
          maskCircles: [maskA, maskC],
          clipCircles: [],
        },
      },
      {
        maskNumber: 4,
        config: {
          targetCircle: cC!,
          maskCircles: [maskA, maskB],
          clipCircles: [],
        },
      },
      {
        maskNumber: 3,
        config: { targetCircle: cB, maskCircles: [maskC], clipCircles: [cA] },
      },
      {
        maskNumber: 5,
        config: { targetCircle: cC!, maskCircles: [maskB], clipCircles: [cA] },
      },
      {
        maskNumber: 6,
        config: { targetCircle: cC!, maskCircles: [maskA], clipCircles: [cB] },
      },
      {
        maskNumber: 7,
        config: { targetCircle: cC!, maskCircles: [], clipCircles: [cA, cB] },
      },
    ];
  } else {
    return [
      {
        maskNumber: 1,
        config: { targetCircle: cA, maskCircles: [maskB], clipCircles: [] },
      },
      {
        maskNumber: 2,
        config: { targetCircle: cB, maskCircles: [maskA], clipCircles: [] },
      },
      {
        maskNumber: 3,
        config: { targetCircle: cB, maskCircles: [], clipCircles: [cA] },
      },
    ];
  }
}

export function getActiveRegions(expression: string, mode: number) {
  const activeRegions: Region[] = [];
  try {
    const regions = getRegions(mode);
    regions.forEach((reg) => {
      if (parseExpression(expression, reg.maskNumber)) {
        activeRegions.push(reg);
      }
    });
    return activeRegions;
  } catch (err) {
    state.error = "שגיאה בביטוי המתמטי.";
    // TODO: alert if no div!
    console.error(err);
    return activeRegions;
  }
}
