import { StringifyOptions } from "../types";
import { applyCssUnits } from "./applyCssUnits";
import { camelToKebab } from "./camelToKebab";
import { isCSSPropertyValue } from "./isCSSPropertyValue";

export type StyleDeclaration = Record<string, string | number>;

/**
 * Converts a StyleDeclaration object into a CSS string.
 *
 * @param {object} styleDeclaration - An object representing a CSS declaration block, where keys are camelCased CSS property names and values are the corresponding CSS values (strings or numbers).
 * @param {StringifyOptions<T>} [options] - Optional configuration object:
 *   - `important` — If set to `true`, appends `!important` to each CSS declaration.
 *   - `unit` — A CSS unit or a map of property keys to units:
 *     - If a string is provided (e.g. `'em'`), it will be used as the unit for all numeric properties.
 *     - If a map is provided (e.g. `{ width: 'rem' }`), the unit will be applied per numeric property.
 *     - If a property has a numeric value and no specific unit is defined in the map, `'px'` will be used by default.
 *
 * @returns {string} A formatted CSS string where:
 *   - Keys are converted from camelCase to kebab-case.
 *   - Units are added to numeric values as specified, or `'px'` by default.
 *   - Each declaration ends with a semicolon.
 *   - `!important` is appended if the `important` flag is set.
 */
export function stringifyStyleDeclaration<T extends object = StyleDeclaration>(
  styleDeclaration: T,
  options?: StringifyOptions<T>
): string {
  if (typeof styleDeclaration !== "object" || styleDeclaration === null) {
    throw new TypeError(
      `[stringifyStyleDeclaration]: Expected 'styleDeclaration' to be a non-null object, but received ${styleDeclaration} (type:${typeof styleDeclaration}).`
    );
  }

  const importantSuffix = options?.important ? "!important" : "";

  return Object.entries(styleDeclaration)
    .filter(([_, value]) => isCSSPropertyValue(value))
    .map(
      ([property, value]) =>
        `${camelToKebab(property)}:${applyCssUnits(
          property,
          value,
          options?.unit
        )}${importantSuffix};`
    )
    .join("");
}
