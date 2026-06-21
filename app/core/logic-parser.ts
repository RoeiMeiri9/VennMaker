type Token = { type: "VAR" | "OP" | "PAREN"; value: string };

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  const normalized = expr.toUpperCase();

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    if (!char) continue;

    if (char === " " || char === "\t") {
      continue; // ignore whitespace
    } else if ("ABC".includes(char)) {
      tokens.push({ type: "VAR", value: char });
    } else if (char === "(" || char === ")") {
      tokens.push({ type: "PAREN", value: char });
    } else if ("&|!^-".includes(char)) {
      tokens.push({ type: "OP", value: char });
    } else if (char === "N") {
      tokens.push({ type: "OP", value: "&" });
    } else if (char === "U") {
      tokens.push({ type: "OP", value: "|" });
    } else {
      throw new Error(
        `Unexpected character "${char}" at position ${i} in expression "${expr}"`,
      );
    }
  }

  return tokens;
}

export function safeEvaluate(
  expr: string,
  values: Record<string, boolean>,
): boolean {
  const tokens = tokenize(expr);
  let pos = 0;

  function peek(): Token | undefined {
    return tokens[pos];
  }

  // OR ( | ) — lowest precedence
  function parseExpression(): boolean {
    let left = parseXor();
    while (peek()?.value === "|") {
      pos++;
      const right = parseXor(); // always parsed, never skipped by short-circuit
      left = left || right;
    }
    return left;
  }

  // XOR ( ^ ) — between OR and AND
  function parseXor(): boolean {
    let left = parseTerm();
    while (peek()?.value === "^") {
      pos++;
      const right = parseTerm();
      left = left !== right;
    }
    return left;
  }

  // AND ( & ) and "A-B" meaning "A AND NOT B" — higher precedence
  function parseTerm(): boolean {
    let left = parseFactor();
    while (peek()?.value === "&" || peek()?.value === "-") {
      const op = peek()?.value;
      pos++;
      const right = parseFactor();
      left = op === "&" ? left && right : left && !right;
    }
    return left;
  }

  // NOT ( ! ), parentheses, and variables — highest precedence
  function parseFactor(): boolean {
    const token = peek();

    if (!token) {
      throw new Error(`Unexpected end of expression in "${expr}"`);
    }

    if (token.value === "!") {
      pos++;
      return !parseFactor();
    }

    if (token.value === "(") {
      pos++; // consume '('
      const val = parseExpression();

      if (peek()?.value !== ")") {
        throw new Error(
          `Expected ")" at position ${pos} in expression "${expr}"`,
        );
      }
      pos++; // consume ')'
      return val;
    }

    if (token.type !== "VAR") {
      throw new Error(`Unexpected token "${token.value}" at position ${pos}`);
    }

    if (!(token.value in values)) {
      throw new Error(`No value provided for variable "${token.value}"`);
    }

    const val = values[token.value];
    pos++;
    return val || false;
  }

  const result = parseExpression();

  if (pos !== tokens.length) {
    throw new Error(
      `Unexpected trailing tokens starting at position ${pos} in "${expr}"`,
    );
  }

  return result;
}
