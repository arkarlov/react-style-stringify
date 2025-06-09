import { CSSUnit, CSSUnitMap } from "../types";
import { isUnitless } from "./isUnitless";

const DEFAULT_UNIT = "px";

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

  if (typeof value === "string" || value === 0 || isUnitless(property)) {
    return `${value}`;
  }

  const resolvedUnit =
    (typeof unit === "string" ? unit : unit[property]) || DEFAULT_UNIT;

  return `${value}${resolvedUnit}`;
}
