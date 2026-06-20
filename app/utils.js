export function parseExpression(expr, maskValue) {
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

const hebrewToEnglish = {
  ש: "A",
  נ: "B",
  ב: "C",
  ו: "u",
  מ: "n",
};

export function translateHebrewInput(value) {
  return value
    .split("")
    .map((char) => hebrewToEnglish[char] || char)
    .join("");
}
