import { type CSSProperties } from "react";
import { applyCssUnits, camelToKebab } from "./utils";

/**
 * Converts a CSSProperties object into a CSS string.
 *
 * @param {CSSProperties} cssProperties - An object representing the CSS properties, where the keys are camelCased property names and the values are the corresponding CSS values.
 * @param {boolean} [isImportant=false] - A flag indicating whether to append the `!important` statement to each CSS property. Defaults to `false`.
 *
 * @returns {string} - A formatted CSS string, with properties converted to kebab-case and units added where necessary. If `isImportant` is true, each property will be suffixed with `!important`.
 */
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
