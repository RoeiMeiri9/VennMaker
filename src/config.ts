export type Circle = {
  cx: number;
  cy: number;
  r: number;
  id: string;
};

export interface RegionConfig {
  width: number;
  height: number;
  circles: Circle[];
}

export const CONFIG: Record<2 | 3, RegionConfig> = {
  3: {
    width: 400,
    height: 360,
    circles: [
      { id: "cA", cx: 150, cy: 140, r: 90 },
      { id: "cB", cx: 250, cy: 140, r: 90 },
      { id: "cC", cx: 200, cy: 220, r: 90 },
    ],
  },
  2: {
    width: 400,
    height: 220,
    circles: [
      { id: "cA", cx: 160, cy: 110, r: 90 },
      { id: "cB", cx: 240, cy: 110, r: 90 },
    ],
  },
};
