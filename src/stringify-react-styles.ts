import { type CSSProperties } from "react";
import { type StringifyOptions } from "./types";
import { stringifyStyleDeclaration } from "./stringifyStyleDeclaration";
import { stringifyStyleRule } from "./stringifyStyleRule";

/**
 * Converts a CSSProperties object into a CSS string.
 *
 * @param {CSSProperties} cssProperties - An object representing CSS declarations, where keys are camelCased property names and values are the corresponding CSS values.
 *   - CSSProperties type comes from `@types/react` and is commonly used for inline styles in React components.
 *
 * @param {StringifyOptions | boolean} [optionsOrImportant=false] - Either a boolean indicating whether to append `!important` to each property,
 *                                                                  or an object with more detailed formatting options:
 *   - `important` (boolean): If true, appends `!important` to each property.
 *   - `unit` (object | string): A unit (like `'em'`, `'%'`, etc.) to apply to numeric values, or a map of per-property units.
 *     If a unit is not provided, `'px'` is used by default for numeric values (except for unitless properties).
 *
 * @returns {string} A formatted CSS string where each property is converted to kebab-case, units are added where necessary,
 *                   and `!important` is appended if specified.
 *
 * @throws {Error} Throws if `cssProperties` is not a non-null object.
 */
export function stringifyCSSProperties(
  cssProperties: CSSProperties,
  optionsOrImportant: StringifyOptions<CSSProperties> | boolean = false
): string {
  if (typeof cssProperties !== "object" || cssProperties === null) {
    throw new TypeError(
      `[stringifyCSSProperties]: Expected 'cssProperties' to be a non-null object, but received ${cssProperties} (type:${typeof cssProperties}).`
    );
  }

  const options =
    typeof optionsOrImportant === "boolean"
      ? {
          important: optionsOrImportant,
        }
      : optionsOrImportant;

  return stringifyStyleDeclaration<CSSProperties>(cssProperties, options);
}

export type StyleMap = Record<string, CSSProperties>;

/**
 * Converts a `StyleMap` (a map of CSS selectors to React `CSSProperties`) into a string of CSS rules.
 *
 * @param {StyleMap} styleMap - An object where keys are CSS selectors and values are React-style `CSSProperties` objects (camelCased CSS declarations).
 * @param {StringifyOptions | boolean} [optionsOrImportant=false] - Either a boolean flag to apply `!important` to all declarations, or an options object that may include `important` and per-property unit definitions.
 *
 * @returns {string} A formatted CSS string where each selector is followed by its corresponding declarations.
 *                   Properties are converted to kebab-case and numeric values are suffixed with appropriate units unless the property is unitless.
 *
 * @throws {Error} Throws if `cssProperties` is not a non-null object.
 */
export function stringifyStyleMap(
  styleMap: StyleMap,
  optionsOrImportant: StringifyOptions<CSSProperties> | boolean = false
): string {
  if (typeof styleMap !== "object" || styleMap === null) {
    throw new TypeError(
      `[stringifyStyleMap]: Expected 'styleMap' to be a non-null object, but received ${styleMap} (type:${typeof styleMap}).`
    );
  }

  const options =
    typeof optionsOrImportant === "boolean"
      ? {
          important: optionsOrImportant,
        }
      : optionsOrImportant;

  return stringifyStyleRule<CSSProperties>(styleMap, options);
}
