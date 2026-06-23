export const state: { expression: string; mode: 2 | 3; error: string } = $state(
  {
    expression: "(A U B) - C",
    mode: 3,
    error: "",
  },
);
