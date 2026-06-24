export const state: { expression: string; mode: 2 | 3; error: string } = $state(
  {
    expression: "A - (B n C)",
    mode: 3,
    error: "",
  },
);

export function setMode(num: 2 | 3) {
  state.mode = num;

  if (num === 2 && state.expression.includes("C")) {
    state.expression = "A - B";
  }
}
