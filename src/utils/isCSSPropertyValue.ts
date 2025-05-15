export const isCSSPropertyValue = (value: unknown): value is number | string =>
  typeof value === "number" || typeof value === "string";
