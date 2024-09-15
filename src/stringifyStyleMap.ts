import { type StyleMap } from "./types";
import { stringifyCSSProperties } from "./stringifyCSSProperties";

export function stringifyStyleMap(
  styleMap: StyleMap,
  isImportant: boolean = false
) {
  return Object.entries(styleMap)
    .map(
      ([key, value]) => `${key}{${stringifyCSSProperties(value, isImportant)}}`
    )
    .join(" ");
}
