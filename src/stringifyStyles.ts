import { type StyleObject } from "./types";
import { stringifyCSSProperties } from "./stringifyCSSProperties";

export function stringifyStyles(
  styleObject: StyleObject,
  isImportant: boolean = false
) {
  return Object.entries(styleObject)
    .map(
      ([key, value]) => `${key}{${stringifyCSSProperties(value, isImportant)}}`
    )
    .join(" ");
}
