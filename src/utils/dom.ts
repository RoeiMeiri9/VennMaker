export function createEl<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  props: Partial<HTMLElementTagNameMap[K]> = {},
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  Object.assign(el, props);
  return el;
}
