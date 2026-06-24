import { safeEvaluate } from "@core/logic-parser";
import { state } from "@src/states.svelte";
import { translateHebrewInput } from "./hebrewToEnglish";

export function parseExpression(expr: string, maskValue: number) {
  const clean = expr
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/U/g, "|")
    .replace(/N/g, "&")
    .replace(/\^/g, "^")
    .replace(/!/g, "!");
  const values = {
    A: (maskValue & 1) !== 0,
    B: (maskValue & 2) !== 0,
    C: (maskValue & 4) !== 0,
  };

  try {
    const result = safeEvaluate(clean, values);
    console.log(`Mask: ${maskValue}, Values:`, values, `Result: ${result}`);
    return result;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function correctExpression() {
  const { expression } = state;
  const correctedValue = translateHebrewInput(expression);

  if (expression !== correctedValue) {
    state.expression = correctedValue;
  }
}
