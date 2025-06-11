import unitless from "@emotion/unitless";
import { CSSUnit, CSSUnitMap } from "./types";

const DEFAULT_UNIT = "px";

export const isCSSPropertyValue = (value: unknown): value is number | string =>
  typeof value === "number" || typeof value === "string";

export function camelToKebab(str: string) {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

export function trimCssSelector(selector: string) {
  return selector
    .replace(/\s*([+~>])\s*/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function applyCssUnits<T extends string = string>(
  property: T,
  value: string | number,
  unit: CSSUnit | CSSUnitMap<T> = DEFAULT_UNIT
) {
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error(
      "Invalid input: value of 'cssProperties' must be string or number."
    );
  }

  const isUnitless = unitless[property] === 1;

  if (typeof value === "string" || value === 0 || isUnitless) {
    return `${value}`;
  }

  const resolvedUnit =
    (typeof unit === "string" ? unit : unit[property]) || DEFAULT_UNIT;

  return `${value}${resolvedUnit}`;
}
