const hebrewToEnglish: Record<string, string> = {
  ש: "A",
  נ: "B",
  ב: "C",
  ו: "u",
  מ: "n",
};

export function translateHebrewInput(value: string) {
  return value
    .split("")
    .map((char) => hebrewToEnglish[char] || char)
    .join("");
}
