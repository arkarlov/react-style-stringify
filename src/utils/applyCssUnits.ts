import { isUnitless } from "./isUnitless";

export function applyCssUnits(
  prop: string,
  value: string | number,
  units: string = "px"
) {
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error(
      "Invalid input: value of 'cssProperties' must be an string or number."
    );
  }

  if (typeof value === "number" && value !== 0 && !isUnitless(prop)) {
    return `${value}${units}`;
  }

  return `${value}`;
}
