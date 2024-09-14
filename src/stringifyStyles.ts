import { type StyleObject } from "./types";
import { stringifyCSSProperties } from "./stringifyCSSProperties";

export function stringifyStyles(
  styleObject: StyleObject,
  important: boolean = false
) {
  return Object.entries(styleObject)
    .map(
      ([key, value]) => `${key}{${stringifyCSSProperties(value, important)}}`
    )
    .join(" ");
}
