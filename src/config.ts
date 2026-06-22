export interface RegionConfig {
  width: number;
  height: number;
  cA: { cx: number; cy: number; r: number };
  cB: { cx: number; cy: number; r: number };
  cC?: { cx: number; cy: number; r: number };
}

export const CONFIG: Record<number, RegionConfig> = {
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
    cA: { cx: 160, cy: 110, r: 90 },
    cB: { cx: 240, cy: 110, r: 90 },
  },
};
