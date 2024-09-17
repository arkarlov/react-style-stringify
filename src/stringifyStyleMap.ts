import { type StyleMap } from "./types";
import { stringifyCSSProperties } from "./stringifyCSSProperties";

/**
 * Converts a `StyleMap` (a map of CSS selectors to `CSSProperties`) into a string of CSS rules.
 *
 * @param {StyleMap} styleMap - An object where keys are CSS selectors and values are `CSSProperties` objects.
 * @param {boolean} [isImportant=false] - A flag indicating whether to append the `!important` statement to each CSS property within the style map. Defaults to `false`.
 *
 * @returns {string} - A formatted string of CSS rules, where each selector's styles are converted to a CSS string. If `isImportant` is true, each property will be suffixed with `!important`.
 */
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
