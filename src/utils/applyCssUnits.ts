import { isUnitless } from "./isUnitless";

export function applyCssUnits(
  prop: string,
  value: string | number,
  units: string = "px"
) {
  if (typeof value === "number" && value !== 0 && !isUnitless(prop)) {
    return `${value}${units}`;
  }

  return `${value}`;
}
