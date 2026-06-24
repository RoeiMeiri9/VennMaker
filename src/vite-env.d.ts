/// <reference types="svelte" />
/// <reference types="vite/client" />

// 1. הוספת ה-Declaration שחסר ל-TS כדי שיזהה קבצי svelte
declare module "*.svelte" {
  import type { SvelteComponent } from "svelte";
  const component: typeof SvelteComponent;
  export default component;
}

// 2. ההגדרות שלך ל-Window (אם אתה עדיין צריך אותן למורשת)
// declare global {
//   interface Window {
//     setCircles: (c: any) => void;
//     renderDiagram: () => void;
//     copySVGAsImage: () => void;
//   }
// }

export {};
