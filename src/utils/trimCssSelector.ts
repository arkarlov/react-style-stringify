export function trimCssSelector(selector: string) {
  return selector
    .replace(/\s*([+~>])\s*/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}
