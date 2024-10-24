import { type StyleMap } from "./types";
import { stringifyCSSProperties } from "./stringifyCSSProperties";
import { trimCssSelector } from "./utils";

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
  if (typeof styleMap !== "object" || styleMap === null) {
    throw new Error("Invalid input: 'styleMap' must be an object.");
  }

  return Object.entries(styleMap)
    .reduce<string[]>((result, [key, value]) => {
      if (Object.keys(value).length > 0) {
        result.push(
          `${trimCssSelector(key)}{${stringifyCSSProperties(
            value,
            isImportant
          )}}`
        );
      }
      return result;
    }, [])
    .join("");
}
