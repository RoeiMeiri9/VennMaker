/// <reference types="svelte" />
/// <reference types="vite/client" />
export {};

declare global {
  interface Window {
    setCircles: (c: any) => void;
    renderDiagram: () => void;
    copySVGAsImage: () => void;
  }
}
