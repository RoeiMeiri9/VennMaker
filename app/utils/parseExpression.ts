export function parseExpression(expr: string, maskValue: number) {
  let clean = expr
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/U/g, "|")
    .replace(/N/g, "&")
    .replace(/\^/g, "^")
    .replace(/!/g, "!")
    .replace(/-/g, "&!");

  let a = maskValue & 1 ? "true" : "false";
  let b = maskValue & 2 ? "true" : "false";
  let c = maskValue & 4 ? "true" : "false";

  clean = clean
    .replace(/A/g, `(${a})`)
    .replace(/B/g, `(${b})`)
    .replace(/C/g, `(${c})`);

  try {
    return !!eval(clean);
  } catch (e) {
    throw new Error("שגיאה בניסוח הביטוי.");
  }
}
