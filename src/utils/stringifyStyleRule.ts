import {
  stringifyStyleDeclaration,
  type StyleDeclaration,
} from "./stringifyStyleDeclaration";
import { trimCssSelector } from "./trimCssSelector";
import { type StringifyOptions } from "../types";

export type StyleRule<T extends object = StyleDeclaration> = Record<string, T>;

/**
 * Converts a style rule object into a CSS string.
 *
 * @template T - The type representing CSS property keys and values used in the style declarations.
 *
 * @param {StyleRule<T>} styleRule - An object where keys are CSS selectors and values are style declarations
 *                                   (objects mapping CSS properties to values).
 * @param {StringifyOptions<T>} [options] - Optional settings controlling how declarations are stringified,
 *                                         such as appending `!important` or units.
 *
 * @throws {Error} Throws if the `styleRule` argument is not a non-null object.
 *
 * @returns {string} A CSS string where each selector and its corresponding declarations are formatted properly.
 *                   Empty declarations are skipped.
 */
export function stringifyStyleRule<T extends object = StyleDeclaration>(
  styleRule: StyleRule<T>,
  options?: StringifyOptions<T>
): string {
  if (typeof styleRule !== "object" || styleRule === null) {
    throw new TypeError(
      `[stringifyStyleRule]: Expected 'styleRule' to be a non-null object, but received ${styleRule} (type:${typeof styleRule}).`
    );
  }

  return Object.entries(styleRule)
    .reduce<string[]>((result, [selector, declaration]) => {
      if (Object.keys(declaration).length > 0) {
        result.push(
          `${trimCssSelector(selector)}{${stringifyStyleDeclaration<T>(
            declaration,
            options
          )}}`
        );
      }
      return result;
    }, [])
    .join("");
}
