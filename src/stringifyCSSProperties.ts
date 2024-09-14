import { type CSSProperties } from "react";
import { camelToKebab } from "./formatters";

export function stringifyCSSProperties(
  cssProperties: CSSProperties,
  important: boolean = false
) {
  return Object.entries(cssProperties)
    .map(
      ([key, value]) =>
        `${camelToKebab(key)}:${value}${important ? "!important" : ""}`
    )
    .join("; ");
}
