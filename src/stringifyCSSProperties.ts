import { type CSSProperties } from "react";
import { camelToKebab } from "./formatters";
import { applyCssUnits } from "./utils";

export function stringifyCSSProperties(
  cssProperties: CSSProperties,
  isImportant: boolean = false
) {
  const important = isImportant ? "!important" : "";

  return Object.entries(cssProperties)
    .map(
      ([key, value]) =>
        `${camelToKebab(key)}:${applyCssUnits(key, value)}${important};`
    )
    .join(" ");
}
