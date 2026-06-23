import { Circle } from "@src/config";

export type MaskCircles = {
  id: string;
  circle: Circle;
};

export type RegionConfig = {
  maskCircles: MaskCircles[]; // מה צריך להסתיר (Mask)
  clipCircles: Circle[]; // מה צריך לחתוך (Clip)
  targetCircle: Circle; // העיגול הראשי שמוצג
};

export type Region = {
  maskNumber: number;
  config: RegionConfig; // זה הופך את הקוד להרבה יותר ברור
};
